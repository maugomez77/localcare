from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.demo_data import BOOKINGS, CAREGIVERS, FAMILIES, PAYMENTS
from app.models import BookingCreate, BookingUpdate

router = APIRouter(prefix="/api", tags=["bookings"])


@router.get("/bookings")
def list_bookings(status: Optional[str] = Query(None)):
    results = list(BOOKINGS)
    if status:
        results = [b for b in results if b["status"] == status]
    return {"bookings": results, "total": len(results)}


@router.get("/bookings/{booking_id}")
def get_booking(booking_id: str):
    booking = next((b for b in BOOKINGS if b["id"] == booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.post("/bookings", status_code=201)
def create_booking(data: BookingCreate):
    caregiver = next((c for c in CAREGIVERS if c["id"] == data.caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    family = next((f for f in FAMILIES if f["id"] == data.family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    new_id = f"bk-{len(BOOKINGS) + 1:03d}"
    total_hours = data.hours_per_week * 4
    total_cost = total_hours * caregiver["hourly_rate"]

    new_booking = {
        "id": new_id,
        "caregiver_id": data.caregiver_id,
        "caregiver_name": caregiver["name"],
        "family_id": data.family_id,
        "family_name": family["name"],
        "care_recipient_name": family["care_recipient"]["name"],
        "status": "requested",
        "start_date": data.start_date,
        "end_date": data.end_date,
        "hours_per_week": data.hours_per_week,
        "total_hours": total_hours,
        "hourly_rate": caregiver["hourly_rate"],
        "total_cost": total_cost,
        "notes": data.notes,
        "created_at": "2026-03-26",
    }
    BOOKINGS.append(new_booking)
    return new_booking


@router.patch("/bookings/{booking_id}")
def update_booking(booking_id: str, data: BookingUpdate):
    booking = next((b for b in BOOKINGS if b["id"] == booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    update_data = data.model_dump(exclude_none=True)

    if "status" in update_data and update_data["status"] == "completed":
        amount = booking["total_cost"]
        commission = round(amount * 0.15, 2)
        net_payout = round(amount - commission, 2)
        new_payment = {
            "id": f"pay-{len(PAYMENTS) + 1:03d}",
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
        PAYMENTS.append(new_payment)

    for key, value in update_data.items():
        booking[key] = value

    return booking
