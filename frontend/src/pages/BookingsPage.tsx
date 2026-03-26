import { useEffect, useState } from "react";
import api from "../lib/api";
import StatusBadge from "../components/ui/StatusBadge";

interface Booking {
  id: string;
  caregiver_id: string;
  caregiver_name: string;
  family_id: string;
  family_name: string;
  care_recipient_name: string;
  status: string;
  start_date: string;
  end_date: string;
  hours_per_week: number;
  total_hours: number;
  hourly_rate: number;
  total_cost: number;
  notes: string;
  created_at: string;
}

const statuses = ["all", "requested", "confirmed", "in_progress", "completed", "cancelled"];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchBookings = (status: string) => {
    setLoading(true);
    const url = status === "all" ? "/api/bookings" : `/api/bookings?status=${status}`;
    api.get(url).then((res) => {
      setBookings(res.data.bookings);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBookings(activeStatus);
  }, [activeStatus]);

  return (
    <div className="space-y-6">
      {/* Status Pipeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-4">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeStatus === status
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status === "all" ? "All" : status.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">{bookings.length} bookings</p>
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-purple-100">
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">ID</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Caregiver</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Family</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Care Recipient</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Period</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                    <th className="text-right px-6 py-3 text-gray-500 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <>
                      <tr
                        key={b.id}
                        onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                        className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{b.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{b.caregiver_name}</td>
                        <td className="px-6 py-4 text-gray-600">{b.family_name}</td>
                        <td className="px-6 py-4 text-gray-600">{b.care_recipient_name}</td>
                        <td className="px-6 py-4 text-gray-600 text-xs">
                          {b.start_date} - {b.end_date}
                        </td>
                        <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          ${b.total_cost.toLocaleString()}
                        </td>
                      </tr>
                      {expandedId === b.id && (
                        <tr key={`${b.id}-detail`}>
                          <td colSpan={7} className="px-6 py-4 bg-purple-50/30">
                            <div className="grid sm:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-xs font-medium text-gray-500">Hours/Week</p>
                                <p className="font-medium text-gray-900">{b.hours_per_week}h</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Total Hours</p>
                                <p className="font-medium text-gray-900">{b.total_hours}h</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Hourly Rate</p>
                                <p className="font-medium text-gray-900">${b.hourly_rate}/hr</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Created</p>
                                <p className="font-medium text-gray-900">{b.created_at}</p>
                              </div>
                            </div>
                            {b.notes && (
                              <div className="mt-3">
                                <p className="text-xs font-medium text-gray-500">Notes</p>
                                <p className="text-sm text-gray-600">{b.notes}</p>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
