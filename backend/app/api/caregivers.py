from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.models import CaregiverCreate, CaregiverUpdate
from app.store import load, save

router = APIRouter(prefix="/api", tags=["caregivers"])


@router.get("/caregivers")
def list_caregivers(
    specialty: Optional[str] = Query(None),
    language: Optional[str] = Query(None),
    min_rate: Optional[float] = Query(None),
    max_rate: Optional[float] = Query(None),
    min_rating: Optional[float] = Query(None),
    availability_day: Optional[str] = Query(None),
):
    data = load()
    results = list(data["caregivers"])

    if specialty:
        results = [c for c in results if specialty.lower() in [s.lower() for s in c["specialties"]]]
    if language:
        results = [c for c in results if language.lower() in [l.lower() for l in c["languages"]]]
    if min_rate is not None:
        results = [c for c in results if c["hourly_rate"] >= min_rate]
    if max_rate is not None:
        results = [c for c in results if c["hourly_rate"] <= max_rate]
    if min_rating is not None:
        results = [c for c in results if c["rating"] >= min_rating]
    if availability_day:
        results = [c for c in results if availability_day.lower() in c["availability"]]

    return {"caregivers": results, "total": len(results)}


@router.get("/caregivers/{caregiver_id}")
def get_caregiver(caregiver_id: str):
    data = load()
    caregiver = next((c for c in data["caregivers"] if c["id"] == caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    caregiver_reviews = [r for r in data["reviews"] if r["caregiver_id"] == caregiver_id]
    caregiver_bookings = [b for b in data["bookings"] if b["caregiver_id"] == caregiver_id]

    return {
        **caregiver,
        "reviews": caregiver_reviews,
        "booking_history": caregiver_bookings,
    }


@router.post("/caregivers", status_code=201)
def create_caregiver(data_in: CaregiverCreate):
    data = load()
    new_id = f"cg-{len(data['caregivers']) + 1:03d}"
    new_caregiver = {
        "id": new_id,
        "name": data_in.name,
        "email": data_in.email,
        "phone": data_in.phone,
        "photo_url": f"https://api.dicebear.com/7.x/avataaars/svg?seed={data_in.name.split()[0]}",
        "bio": data_in.bio,
        "certifications": data_in.certifications,
        "specialties": data_in.specialties,
        "hourly_rate": data_in.hourly_rate,
        "rating": 0.0,
        "total_reviews": 0,
        "years_experience": 0,
        "availability": {},
        "background_check_status": "pending",
        "languages": data_in.languages,
        "location": data_in.location,
        "joined_date": "2026-03-26",
        "total_bookings": 0,
        "is_active": True,
    }
    data["caregivers"].append(new_caregiver)
    save(data)
    return new_caregiver


@router.patch("/caregivers/{caregiver_id}")
def update_caregiver(caregiver_id: str, data_in: CaregiverUpdate):
    data = load()
    caregiver = next((c for c in data["caregivers"] if c["id"] == caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    update_data = data_in.model_dump(exclude_none=True)
    for key, value in update_data.items():
        caregiver[key] = value

    save(data)
    return caregiver
