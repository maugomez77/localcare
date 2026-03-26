import { useEffect, useState } from "react";
import api from "../lib/api";
import StarRating from "../components/ui/StarRating";

interface Review {
  id: string;
  booking_id: string;
  caregiver_id: string;
  caregiver_name: string;
  family_id: string;
  family_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "rating_high" | "rating_low">("date");

  useEffect(() => {
    api.get("/api/reviews").then((res) => {
      setReviews(res.data.reviews);
      setLoading(false);
    });
  }, []);

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "rating_high") return b.rating - a.rating;
    if (sortBy === "rating_low") return a.rating - b.rating;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length > 0 ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  // Aggregate by caregiver
  const caregiverMap = new Map<string, { name: string; total: number; count: number }>();
  reviews.forEach((r) => {
    const existing = caregiverMap.get(r.caregiver_id);
    if (existing) {
      existing.total += r.rating;
      existing.count += 1;
    } else {
      caregiverMap.set(r.caregiver_id, { name: r.caregiver_name, total: r.rating, count: 1 });
    }
  });
  const caregiverPerformance = Array.from(caregiverMap.entries())
    .map(([id, data]) => ({ id, name: data.name, avg: data.total / data.count, count: data.count }))
    .sort((a, b) => b.avg - a.avg);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Rating Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Overview</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
              <StarRating rating={avgRating} size="sm" showValue={false} />
              <p className="text-xs text-gray-500 mt-1">{reviews.length} reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.star} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-3">{item.star}</span>
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-6 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Caregiver Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Caregiver Performance</h3>
          <div className="space-y-3">
            {caregiverPerformance.map((cg) => (
              <div key={cg.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{cg.name}</p>
                  <p className="text-xs text-gray-500">{cg.count} reviews</p>
                </div>
                <StarRating rating={cg.avg} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort & Reviews List */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{reviews.length} reviews total</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="date">Most Recent</option>
          <option value="rating_high">Highest Rating</option>
          <option value="rating_low">Lowest Rating</option>
        </select>
      </div>

      <div className="space-y-4">
        {sorted.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-medium text-gray-900">{review.family_name}</p>
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <p className="text-sm text-purple-600 font-medium">{review.caregiver_name}</p>
                </div>
                <StarRating rating={review.rating} size="sm" showValue={false} />
              </div>
              <p className="text-xs text-gray-400">{review.created_at}</p>
            </div>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
