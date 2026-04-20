from fastapi import APIRouter

from app.store import load

router = APIRouter(prefix="/api", tags=["payments"])


@router.get("/payments")
def list_payments():
    data = load()
    return {"payments": data["payments"], "total": len(data["payments"])}


@router.get("/payments/summary")
def payment_summary():
    data = load()
    payments = data["payments"]
    completed = [p for p in payments if p["status"] == "completed"]
    pending = [p for p in payments if p["status"] == "pending"]

    total_revenue = sum(p["amount"] for p in completed)
    total_commission = sum(p["commission"] for p in completed)
    total_payouts = sum(p["net_payout"] for p in completed)
    pending_amount = sum(p["amount"] for p in pending)
    pending_commission = sum(p["commission"] for p in pending)

    return {
        "total_revenue": round(total_revenue, 2),
        "total_commission": round(total_commission, 2),
        "total_payouts": round(total_payouts, 2),
        "pending_amount": round(pending_amount, 2),
        "pending_commission": round(pending_commission, 2),
        "completed_payments": len(completed),
        "pending_payments": len(pending),
        "commission_rate": 0.15,
    }
