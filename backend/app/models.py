from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class Caregiver(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    photo_url: str
    bio: str
    certifications: list[str]
    specialties: list[str]
    hourly_rate: float
    rating: float
    total_reviews: int
    years_experience: int
    availability: dict[str, list[str]]  # day -> time slots
    background_check_status: str  # "cleared", "pending", "expired"
    languages: list[str]
    location: str
    joined_date: str
    total_bookings: int
    is_active: bool = True


class CareRecipient(BaseModel):
    name: str
    age: int
    care_needs: list[str]
    medical_conditions: list[str]
    mobility_level: str  # "independent", "assisted", "wheelchair", "bedridden"
    notes: str


class Family(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    location: str
    care_recipient: CareRecipient
    preferred_schedule: dict[str, list[str]]
    budget_min: float
    budget_max: float
    joined_date: str
    total_bookings: int
    is_active: bool = True


class Booking(BaseModel):
    id: str
    caregiver_id: str
    caregiver_name: str
    family_id: str
    family_name: str
    care_recipient_name: str
    status: str  # "requested", "confirmed", "in_progress", "completed", "cancelled"
    start_date: str
    end_date: str
    hours_per_week: float
    total_hours: float
    hourly_rate: float
    total_cost: float
    notes: str
    created_at: str


class Review(BaseModel):
    id: str
    booking_id: str
    caregiver_id: str
    caregiver_name: str
    family_id: str
    family_name: str
    rating: int  # 1-5
    comment: str
    created_at: str


class Payment(BaseModel):
    id: str
    booking_id: str
    family_id: str
    family_name: str
    caregiver_id: str
    caregiver_name: str
    amount: float
    commission: float  # 15%
    net_payout: float
    status: str  # "completed", "pending", "failed"
    paid_at: str


class DashboardMetrics(BaseModel):
    total_bookings: int
    active_caregivers: int
    families_served: int
    monthly_revenue: float
    avg_rating: float
    revenue_by_month: list[dict]
    bookings_by_status: dict[str, int]
    top_caregivers: list[dict]
    recent_activity: list[dict]


class CaregiverCreate(BaseModel):
    name: str
    email: str
    phone: str
    bio: str
    certifications: list[str]
    specialties: list[str]
    hourly_rate: float
    languages: list[str]
    location: str


class CaregiverUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    certifications: Optional[list[str]] = None
    specialties: Optional[list[str]] = None
    hourly_rate: Optional[float] = None
    languages: Optional[list[str]] = None
    location: Optional[str] = None
    availability: Optional[dict[str, list[str]]] = None
    is_active: Optional[bool] = None


class FamilyCreate(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    care_recipient: CareRecipient
    preferred_schedule: dict[str, list[str]]
    budget_min: float
    budget_max: float


class FamilyUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    care_recipient: Optional[CareRecipient] = None
    preferred_schedule: Optional[dict[str, list[str]]] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    is_active: Optional[bool] = None


class BookingCreate(BaseModel):
    caregiver_id: str
    family_id: str
    start_date: str
    end_date: str
    hours_per_week: float
    notes: str = ""


class BookingUpdate(BaseModel):
    status: Optional[str] = None
    hours_per_week: Optional[float] = None
    notes: Optional[str] = None


class ReviewCreate(BaseModel):
    booking_id: str
    caregiver_id: str
    family_id: str
    rating: int
    comment: str
