from fastapi import APIRouter
from app.demo_data import CAREGIVERS, FAMILIES, BOOKINGS, REVIEWS, PAYMENTS

router = APIRouter(prefix="/api", tags=["dashboard"])


@router.get("/dashboard")
def get_dashboard():
    total_bookings = len(BOOKINGS)
    active_caregivers = len([c for c in CAREGIVERS if c["is_active"]])
    families_served = len(FAMILIES)

    completed_payments = [p for p in PAYMENTS if p["status"] == "completed"]
    monthly_revenue = sum(p["commission"] for p in completed_payments)

    avg_rating = (
        sum(r["rating"] for r in REVIEWS) / len(REVIEWS) if REVIEWS else 0
    )

    revenue_by_month = [
        {"month": "Oct 2025", "revenue": 0},
        {"month": "Nov 2025", "revenue": 0},
        {"month": "Dec 2025", "revenue": 0},
        {"month": "Jan 2026", "revenue": 1134.00},
        {"month": "Feb 2026", "revenue": 2616.60},
        {"month": "Mar 2026", "revenue": 1228.80},
    ]

    bookings_by_status = {}
    for b in BOOKINGS:
        status = b["status"]
        bookings_by_status[status] = bookings_by_status.get(status, 0) + 1

    caregiver_ratings = {}
    for r in REVIEWS:
        cid = r["caregiver_id"]
        if cid not in caregiver_ratings:
            caregiver_ratings[cid] = {"total": 0, "count": 0, "name": r["caregiver_name"]}
        caregiver_ratings[cid]["total"] += r["rating"]
        caregiver_ratings[cid]["count"] += 1

    top_caregivers = []
    for cid, data in caregiver_ratings.items():
        cg = next((c for c in CAREGIVERS if c["id"] == cid), None)
        if cg:
            top_caregivers.append({
                "id": cid,
                "name": data["name"],
                "rating": round(data["total"] / data["count"], 1),
                "reviews": data["count"],
                "photo_url": cg["photo_url"],
                "specialties": cg["specialties"],
            })
    top_caregivers.sort(key=lambda x: x["rating"], reverse=True)
    top_caregivers = top_caregivers[:5]

    recent_activity = [
        {"type": "booking", "message": "New booking request from The Chen Family for Susan Walsh", "time": "2 hours ago"},
        {"type": "review", "message": "The Williams Family left a 4-star review for Michael Thompson", "time": "6 hours ago"},
        {"type": "payment", "message": "Payment of $2,592 completed for booking bk-011", "time": "1 day ago"},
        {"type": "booking", "message": "Booking confirmed: Elena Reyes with The Johnson Family", "time": "1 day ago"},
        {"type": "caregiver", "message": "Carlos Mendez received new booking request from The O'Brien Family", "time": "2 days ago"},
        {"type": "payment", "message": "Payment of $5,600 completed for booking bk-002", "time": "3 days ago"},
        {"type": "review", "message": "The Chen Family left a 5-star review for James Chen", "time": "3 days ago"},
        {"type": "booking", "message": "Booking bk-004 status changed to in_progress", "time": "4 days ago"},
    ]

    return {
        "total_bookings": total_bookings,
        "active_caregivers": active_caregivers,
        "families_served": families_served,
        "monthly_revenue": monthly_revenue,
        "avg_rating": round(avg_rating, 1),
        "revenue_by_month": revenue_by_month,
        "bookings_by_status": bookings_by_status,
        "top_caregivers": top_caregivers,
        "recent_activity": recent_activity,
    }
