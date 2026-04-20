from fastapi import APIRouter, HTTPException

from app.models import FamilyCreate, FamilyUpdate
from app.store import load, save

router = APIRouter(prefix="/api", tags=["families"])


@router.get("/families")
def list_families():
    data = load()
    return {"families": data["families"], "total": len(data["families"])}


@router.get("/families/{family_id}")
def get_family(family_id: str):
    data = load()
    family = next((f for f in data["families"] if f["id"] == family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    family_bookings = [b for b in data["bookings"] if b["family_id"] == family_id]

    return {
        **family,
        "booking_history": family_bookings,
    }


@router.post("/families", status_code=201)
def create_family(data_in: FamilyCreate):
    data = load()
    new_id = f"fm-{len(data['families']) + 1:03d}"
    new_family = {
        "id": new_id,
        "name": data_in.name,
        "email": data_in.email,
        "phone": data_in.phone,
        "location": data_in.location,
        "care_recipient": data_in.care_recipient.model_dump(),
        "preferred_schedule": data_in.preferred_schedule,
        "budget_min": data_in.budget_min,
        "budget_max": data_in.budget_max,
        "joined_date": "2026-03-26",
        "total_bookings": 0,
        "is_active": True,
    }
    data["families"].append(new_family)
    save(data)
    return new_family


@router.patch("/families/{family_id}")
def update_family(family_id: str, data_in: FamilyUpdate):
    data = load()
    family = next((f for f in data["families"] if f["id"] == family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    update_data = data_in.model_dump(exclude_none=True)
    for key, value in update_data.items():
        if key == "care_recipient" and value is not None:
            family[key] = value.model_dump() if hasattr(value, "model_dump") else value
        else:
            family[key] = value

    save(data)
    return family
