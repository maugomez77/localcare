from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.models import BookingCreate, BookingUpdate
from app.store import load, save

router = APIRouter(prefix="/api", tags=["bookings"])


@router.get("/bookings")
def list_bookings(status: Optional[str] = Query(None)):
    data = load()
    results = list(data["bookings"])
    if status:
        results = [b for b in results if b["status"] == status]
    return {"bookings": results, "total": len(results)}


@router.get("/bookings/{booking_id}")
def get_booking(booking_id: str):
    data = load()
    booking = next((b for b in data["bookings"] if b["id"] == booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.post("/bookings", status_code=201)
def create_booking(data_in: BookingCreate):
    data = load()
    caregiver = next((c for c in data["caregivers"] if c["id"] == data_in.caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    family = next((f for f in data["families"] if f["id"] == data_in.family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    new_id = f"bk-{len(data['bookings']) + 1:03d}"
    total_hours = data_in.hours_per_week * 4
    total_cost = total_hours * caregiver["hourly_rate"]

    new_booking = {
        "id": new_id,
        "caregiver_id": data_in.caregiver_id,
        "caregiver_name": caregiver["name"],
        "family_id": data_in.family_id,
        "family_name": family["name"],
        "care_recipient_name": family["care_recipient"]["name"],
        "status": "requested",
        "start_date": data_in.start_date,
        "end_date": data_in.end_date,
        "hours_per_week": data_in.hours_per_week,
        "total_hours": total_hours,
        "hourly_rate": caregiver["hourly_rate"],
        "total_cost": total_cost,
        "notes": data_in.notes,
        "created_at": "2026-03-26",
    }
    data["bookings"].append(new_booking)
    save(data)
    return new_booking


@router.patch("/bookings/{booking_id}")
def update_booking(booking_id: str, data_in: BookingUpdate):
    data = load()
    booking = next((b for b in data["bookings"] if b["id"] == booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    update_data = data_in.model_dump(exclude_none=True)

    if "status" in update_data and update_data["status"] == "completed":
        amount = booking["total_cost"]
        commission = round(amount * 0.15, 2)
        net_payout = round(amount - commission, 2)
        new_payment = {
            "id": f"pay-{len(data['payments']) + 1:03d}",
            "booking_id": booking_id,
            "family_id": booking["family_id"],
            "family_name": booking["family_name"],
            "caregiver_id": booking["caregiver_id"],
            "caregiver_name": booking["caregiver_name"],
            "amount": amount,
            "commission": commission,
            "net_payout": net_payout,
            "status": "completed",
            "paid_at": "2026-03-26",
        }
        data["payments"].append(new_payment)

    for key, value in update_data.items():
        booking[key] = value

    save(data)
    return booking
