from fastapi import APIRouter, HTTPException

from app.models import ReviewCreate
from app.store import load, save

router = APIRouter(prefix="/api", tags=["reviews"])


@router.get("/reviews")
def list_reviews():
    data = load()
    return {"reviews": data["reviews"], "total": len(data["reviews"])}


@router.get("/reviews/caregiver/{caregiver_id}")
def get_caregiver_reviews(caregiver_id: str):
    data = load()
    caregiver = next((c for c in data["caregivers"] if c["id"] == caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    caregiver_reviews = [r for r in data["reviews"] if r["caregiver_id"] == caregiver_id]

    avg_rating = (
        sum(r["rating"] for r in caregiver_reviews) / len(caregiver_reviews)
        if caregiver_reviews
        else 0
    )

    rating_breakdown = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for r in caregiver_reviews:
        rating_breakdown[r["rating"]] += 1

    return {
        "caregiver_id": caregiver_id,
        "caregiver_name": caregiver["name"],
        "avg_rating": round(avg_rating, 1),
        "total_reviews": len(caregiver_reviews),
        "rating_breakdown": rating_breakdown,
        "reviews": caregiver_reviews,
    }


@router.post("/reviews", status_code=201)
def create_review(data_in: ReviewCreate):
    data = load()
    caregiver = next((c for c in data["caregivers"] if c["id"] == data_in.caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    family = next((f for f in data["families"] if f["id"] == data_in.family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    new_id = f"rv-{len(data['reviews']) + 1:03d}"
    new_review = {
        "id": new_id,
        "booking_id": data_in.booking_id,
        "caregiver_id": data_in.caregiver_id,
        "caregiver_name": caregiver["name"],
        "family_id": data_in.family_id,
        "family_name": family["name"],
        "rating": data_in.rating,
        "comment": data_in.comment,
        "created_at": "2026-03-26",
    }
    data["reviews"].append(new_review)

    caregiver_reviews = [r for r in data["reviews"] if r["caregiver_id"] == data_in.caregiver_id]
    caregiver["rating"] = round(
        sum(r["rating"] for r in caregiver_reviews) / len(caregiver_reviews), 1
    )
    caregiver["total_reviews"] = len(caregiver_reviews)

    save(data)
    return new_review
