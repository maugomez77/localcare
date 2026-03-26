import { Link } from "react-router-dom";
import StarRating from "./StarRating";

interface CaregiverCardProps {
  id: string;
  name: string;
  photo_url: string;
  rating: number;
  total_reviews: number;
  hourly_rate: number;
  specialties: string[];
  years_experience: number;
  languages: string[];
  location: string;
  background_check_status: string;
}

export default function CaregiverCard({
  id,
  name,
  photo_url,
  rating,
  total_reviews,
  hourly_rate,
  specialties,
  years_experience,
  languages,
  location,
  background_check_status,
}: CaregiverCardProps) {
  return (
    <Link
      to={`/app/caregivers/${id}`}
      className="block bg-white rounded-2xl shadow-sm border border-purple-100 p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <img
          src={photo_url}
          alt={name}
          className="w-16 h-16 rounded-full bg-purple-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <p className="text-lg font-bold text-purple-700">${hourly_rate}/hr</p>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={rating} size="sm" />
            <span className="text-xs text-gray-500">({total_reviews} reviews)</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {specialties.map((s) => (
              <span
                key={s}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
            <span>{years_experience} yrs experience</span>
            <span>{languages.join(", ")}</span>
            {background_check_status === "cleared" && (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
