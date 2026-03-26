import { useEffect, useState } from "react";
import api from "../lib/api";

interface CareRecipient {
  name: string;
  age: number;
  care_needs: string[];
  medical_conditions: string[];
  mobility_level: string;
  notes: string;
}

interface Family {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  care_recipient: CareRecipient;
  budget_min: number;
  budget_max: number;
  joined_date: string;
  total_bookings: number;
}

const mobilityColors: Record<string, string> = {
  independent: "bg-emerald-100 text-emerald-800",
  assisted: "bg-yellow-100 text-yellow-800",
  wheelchair: "bg-orange-100 text-orange-800",
  bedridden: "bg-red-100 text-red-800",
};

export default function FamiliesPage() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    api.get("/api/families").then((res) => {
      setFamilies(res.data.families);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{families.length} families registered</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-purple-100">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Family</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Care Recipient</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Location</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Care Needs</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Mobility</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Budget</th>
                <th className="text-center px-6 py-3 text-gray-500 font-medium">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {families.map((f) => (
                <>
                  <tr
                    key={f.id}
                    onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}
                    className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{f.name}</p>
                        <p className="text-xs text-gray-400">Since {f.joined_date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{f.care_recipient.name}</p>
                      <p className="text-xs text-gray-500">Age {f.care_recipient.age}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{f.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {f.care_recipient.care_needs.slice(0, 2).map((n) => (
                          <span key={n} className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                            {n}
                          </span>
                        ))}
                        {f.care_recipient.care_needs.length > 2 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            +{f.care_recipient.care_needs.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mobilityColors[f.care_recipient.mobility_level] || "bg-gray-100 text-gray-800"}`}>
                        {f.care_recipient.mobility_level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      ${f.budget_min}-${f.budget_max}/hr
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{f.total_bookings}</td>
                  </tr>
                  {expandedId === f.id && (
                    <tr key={`${f.id}-detail`}>
                      <td colSpan={7} className="px-6 py-4 bg-purple-50/30">
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">All Care Needs</p>
                            <div className="flex flex-wrap gap-1">
                              {f.care_recipient.care_needs.map((n) => (
                                <span key={n} className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                                  {n}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Medical Conditions</p>
                            <div className="flex flex-wrap gap-1">
                              {f.care_recipient.medical_conditions.map((c) => (
                                <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Notes</p>
                            <p className="text-xs text-gray-600">{f.care_recipient.notes}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-4 text-xs text-gray-500">
                          <span>Email: {f.email}</span>
                          <span>Phone: {f.phone}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
