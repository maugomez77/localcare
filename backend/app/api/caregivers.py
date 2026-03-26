from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.demo_data import CAREGIVERS, REVIEWS, BOOKINGS
from app.models import CaregiverCreate, CaregiverUpdate

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
    results = list(CAREGIVERS)

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
    caregiver = next((c for c in CAREGIVERS if c["id"] == caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    caregiver_reviews = [r for r in REVIEWS if r["caregiver_id"] == caregiver_id]
    caregiver_bookings = [b for b in BOOKINGS if b["caregiver_id"] == caregiver_id]

    return {
        **caregiver,
        "reviews": caregiver_reviews,
        "booking_history": caregiver_bookings,
    }


@router.post("/caregivers", status_code=201)
def create_caregiver(data: CaregiverCreate):
    new_id = f"cg-{len(CAREGIVERS) + 1:03d}"
    new_caregiver = {
        "id": new_id,
        "name": data.name,
        "email": data.email,
        "phone": data.phone,
        "photo_url": f"https://api.dicebear.com/7.x/avataaars/svg?seed={data.name.split()[0]}",
        "bio": data.bio,
        "certifications": data.certifications,
        "specialties": data.specialties,
        "hourly_rate": data.hourly_rate,
        "rating": 0.0,
        "total_reviews": 0,
        "years_experience": 0,
        "availability": {},
        "background_check_status": "pending",
        "languages": data.languages,
        "location": data.location,
        "joined_date": "2026-03-26",
        "total_bookings": 0,
        "is_active": True,
    }
    CAREGIVERS.append(new_caregiver)
    return new_caregiver


@router.patch("/caregivers/{caregiver_id}")
def update_caregiver(caregiver_id: str, data: CaregiverUpdate):
    caregiver = next((c for c in CAREGIVERS if c["id"] == caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    update_data = data.model_dump(exclude_none=True)
    for key, value in update_data.items():
        caregiver[key] = value

    return caregiver
