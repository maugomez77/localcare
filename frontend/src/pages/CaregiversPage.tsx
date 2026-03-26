import { useEffect, useState } from "react";
import api from "../lib/api";
import CaregiverCard from "../components/ui/CaregiverCard";

interface Caregiver {
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

const specialties = ["dementia", "mobility", "medication management", "companionship", "meal prep", "personal hygiene"];
const languages = ["English", "Spanish", "Cantonese", "Tagalog"];

export default function CaregiversPage() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    specialty: "",
    language: "",
    min_rate: "",
    max_rate: "",
    min_rating: "",
  });

  const fetchCaregivers = () => {
    const params = new URLSearchParams();
    if (filters.specialty) params.set("specialty", filters.specialty);
    if (filters.language) params.set("language", filters.language);
    if (filters.min_rate) params.set("min_rate", filters.min_rate);
    if (filters.max_rate) params.set("max_rate", filters.max_rate);
    if (filters.min_rating) params.set("min_rating", filters.min_rating);

    api.get(`/api/caregivers?${params.toString()}`).then((res) => {
      setCaregivers(res.data.caregivers);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const handleFilter = () => {
    setLoading(true);
    fetchCaregivers();
  };

  const clearFilters = () => {
    setFilters({ specialty: "", language: "", min_rate: "", max_rate: "", min_rating: "" });
    setLoading(true);
    setTimeout(() => {
      api.get("/api/caregivers").then((res) => {
        setCaregivers(res.data.caregivers);
        setLoading(false);
      });
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Specialty</label>
            <select
              value={filters.specialty}
              onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Language</label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Languages</option>
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Min Rate</label>
            <input
              type="number"
              placeholder="$"
              value={filters.min_rate}
              onChange={(e) => setFilters({ ...filters, min_rate: e.target.value })}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Max Rate</label>
            <input
              type="number"
              placeholder="$"
              value={filters.max_rate}
              onChange={(e) => setFilters({ ...filters, max_rate: e.target.value })}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Min Rating</label>
            <select
              value={filters.min_rating}
              onChange={(e) => setFilters({ ...filters, min_rating: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Any</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
            </select>
          </div>
          <button
            onClick={handleFilter}
            className="px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">{caregivers.length} caregivers found</p>
          <div className="grid md:grid-cols-2 gap-4">
            {caregivers.map((cg) => (
              <CaregiverCard key={cg.id} {...cg} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
