from fastapi import APIRouter, HTTPException
from app.demo_data import REVIEWS, CAREGIVERS
from app.models import ReviewCreate

router = APIRouter(prefix="/api", tags=["reviews"])


@router.get("/reviews")
def list_reviews():
    return {"reviews": REVIEWS, "total": len(REVIEWS)}


@router.get("/reviews/caregiver/{caregiver_id}")
def get_caregiver_reviews(caregiver_id: str):
    caregiver = next((c for c in CAREGIVERS if c["id"] == caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    caregiver_reviews = [r for r in REVIEWS if r["caregiver_id"] == caregiver_id]

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
def create_review(data: ReviewCreate):
    caregiver = next((c for c in CAREGIVERS if c["id"] == data.caregiver_id), None)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")

    from app.demo_data import FAMILIES
    family = next((f for f in FAMILIES if f["id"] == data.family_id), None)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")

    new_id = f"rv-{len(REVIEWS) + 1:03d}"
    new_review = {
        "id": new_id,
        "booking_id": data.booking_id,
        "caregiver_id": data.caregiver_id,
        "caregiver_name": caregiver["name"],
        "family_id": data.family_id,
        "family_name": family["name"],
        "rating": data.rating,
        "comment": data.comment,
        "created_at": "2026-03-26",
    }
    REVIEWS.append(new_review)

    caregiver_reviews = [r for r in REVIEWS if r["caregiver_id"] == data.caregiver_id]
    caregiver["rating"] = round(
        sum(r["rating"] for r in caregiver_reviews) / len(caregiver_reviews), 1
    )
    caregiver["total_reviews"] = len(caregiver_reviews)

    return new_review
