"""Persistence layer for LocalCare.

Hybrid: Postgres JSONB blob when DATABASE_URL is set (Render), JSON file fallback
for local dev / CLI. Render free tier has ephemeral disk — JSON would be wiped on
every cold start, so production must use Postgres.
"""

from __future__ import annotations

import json
from pathlib import Path

from app.database import KVStore, SessionLocal, is_db_enabled, init_db

STORE_PATH = Path.home() / ".localcare" / "store.json"

_EMPTY: dict = {
    "caregivers": [],
    "families": [],
    "bookings": [],
    "reviews": [],
    "payments": [],
}

_KV_KEY = "main"


def _ensure_dir() -> None:
    STORE_PATH.parent.mkdir(parents=True, exist_ok=True)


def load() -> dict:
    if is_db_enabled():
        with SessionLocal() as s:
            row = s.get(KVStore, _KV_KEY)
            if row and row.value:
                return {**_EMPTY, **row.value}
            return {**_EMPTY}
    _ensure_dir()
    if STORE_PATH.exists():
        return {**_EMPTY, **json.loads(STORE_PATH.read_text())}
    return {**_EMPTY}


def save(data: dict) -> None:
    if is_db_enabled():
        with SessionLocal() as s:
            row = s.get(KVStore, _KV_KEY)
            if row:
                row.value = data
            else:
                s.add(KVStore(key=_KV_KEY, value=data))
            s.commit()
        return
    _ensure_dir()
    STORE_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False))


def _is_empty(data: dict) -> bool:
    """True if none of the top-level collections have any rows."""
    return not any(
        data.get(key) for key in ("caregivers", "families", "bookings", "reviews", "payments")
    )


def seed_if_empty() -> None:
    """Load existing demo constants into the store on first run / empty store."""
    data = load()
    if not _is_empty(data):
        return
    from app.demo_data import CAREGIVERS, FAMILIES, BOOKINGS, REVIEWS, PAYMENTS

    data["caregivers"] = list(CAREGIVERS)
    data["families"] = list(FAMILIES)
    data["bookings"] = list(BOOKINGS)
    data["reviews"] = list(REVIEWS)
    data["payments"] = list(PAYMENTS)
    save(data)


def bootstrap() -> None:
    """Initialize DB schema (if DB enabled) and seed from demo constants when empty."""
    init_db()
    seed_if_empty()
