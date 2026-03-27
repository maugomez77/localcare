from fastapi import APIRouter, HTTPException
from app.demo_data import FAMILIES, BOOKINGS
from app.models import FamilyCreate, FamilyUpdate

router = APIRouter(prefix="/api", tags=["families"])


@router.get("/families")
def list_families():
    return {"families": FAMILIES, "total": len(FAMILIES)}


@router.get("/families/{family_id}")
def get_family(family_id: str):
    family = next((f for f in FAMILIES if f["id"] == family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    family_bookings = [b for b in BOOKINGS if b["family_id"] == family_id]

    return {
        **family,
        "booking_history": family_bookings,
    }


@router.post("/families", status_code=201)
def create_family(data: FamilyCreate):
    new_id = f"fm-{len(FAMILIES) + 1:03d}"
    new_family = {
        "id": new_id,
        "name": data.name,
        "email": data.email,
        "phone": data.phone,
        "location": data.location,
        "care_recipient": data.care_recipient.model_dump(),
        "preferred_schedule": data.preferred_schedule,
        "budget_min": data.budget_min,
        "budget_max": data.budget_max,
        "joined_date": "2026-03-26",
        "total_bookings": 0,
        "is_active": True,
    }
    FAMILIES.append(new_family)
    return new_family


@router.patch("/families/{family_id}")
def update_family(family_id: str, data: FamilyUpdate):
    family = next((f for f in FAMILIES if f["id"] == family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    update_data = data.model_dump(exclude_none=True)
    for key, value in update_data.items():
        if key == "care_recipient" and value is not None:
            family[key] = value.model_dump() if hasattr(value, "model_dump") else value
        else:
            family[key] = value

    return family
