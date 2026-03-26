import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";
import StarRating from "../components/ui/StarRating";
import StatusBadge from "../components/ui/StatusBadge";

interface CaregiverDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo_url: string;
  bio: string;
  certifications: string[];
  specialties: string[];
  hourly_rate: number;
  rating: number;
  total_reviews: number;
  years_experience: number;
  availability: Record<string, string[]>;
  background_check_status: string;
  languages: string[];
  location: string;
  joined_date: string;
  total_bookings: number;
  reviews: { id: string; family_name: string; rating: number; comment: string; created_at: string }[];
  booking_history: { id: string; family_name: string; status: string; start_date: string; end_date: string; total_cost: number }[];
}

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function CaregiverProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [caregiver, setCaregiver] = useState<CaregiverDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/caregivers/${id}`).then((res) => {
      setCaregiver(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading || !caregiver) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/app/caregivers" className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Caregivers
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img
            src={caregiver.photo_url}
            alt={caregiver.name}
            className="w-24 h-24 rounded-2xl bg-purple-100"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{caregiver.name}</h2>
                <p className="text-gray-500">{caregiver.location}</p>
                <div className="mt-2 flex items-center gap-3">
                  <StarRating rating={caregiver.rating} size="md" />
                  <span className="text-sm text-gray-500">({caregiver.total_reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-700">${caregiver.hourly_rate}/hr</p>
                <StatusBadge status={caregiver.background_check_status} />
              </div>
            </div>
            <p className="mt-4 text-gray-600 leading-relaxed">{caregiver.bio}</p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <span>{caregiver.years_experience} years experience</span>
              <span>{caregiver.total_bookings} bookings completed</span>
              <span>Joined {caregiver.joined_date}</span>
              <span>{caregiver.languages.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Certifications & Specialties */}
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Specialties</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {caregiver.certifications.map((cert) => (
                    <span key={cert} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {caregiver.specialties.map((spec) => (
                    <span key={spec} className="px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reviews ({caregiver.reviews.length})
            </h3>
            <div className="space-y-4">
              {caregiver.reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">No reviews yet.</p>
              ) : (
                caregiver.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{review.family_name}</p>
                        <StarRating rating={review.rating} size="sm" showValue={false} />
                      </div>
                      <p className="text-xs text-gray-400">{review.created_at}</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Booking History */}
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-gray-500 font-medium">Family</th>
                    <th className="text-left py-2 text-gray-500 font-medium">Period</th>
                    <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                    <th className="text-right py-2 text-gray-500 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {caregiver.booking_history.map((b) => (
                    <tr key={b.id} className="border-b border-gray-50">
                      <td className="py-3 text-gray-900">{b.family_name}</td>
                      <td className="py-3 text-gray-600">{b.start_date} - {b.end_date}</td>
                      <td className="py-3"><StatusBadge status={b.status} /></td>
                      <td className="py-3 text-right font-medium text-gray-900">${b.total_cost.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Availability */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="space-y-3">
              {dayOrder.map((day) => {
                const slots = caregiver.availability[day];
                return (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize w-24">{day}</span>
                    {slots ? (
                      <div className="flex flex-wrap gap-1">
                        {slots.map((slot) => (
                          <span key={slot} className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                            {slot}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Unavailable</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-900">{caregiver.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="text-gray-900">{caregiver.phone}</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-purple-600 to-rose-500 text-white text-sm font-medium rounded-xl hover:from-purple-700 hover:to-rose-600 transition-all">
              Book This Caregiver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
