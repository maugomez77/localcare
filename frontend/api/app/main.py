from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import dashboard, caregivers, families, bookings, reviews, payments

app = FastAPI(
    title="LocalCare API",
    description="Two-sided marketplace connecting certified home health aides with families needing elder care",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)
app.include_router(caregivers.router)
app.include_router(families.router)
app.include_router(bookings.router)
app.include_router(reviews.router)
app.include_router(payments.router)


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "localcare-api", "version": "1.0.0"}
