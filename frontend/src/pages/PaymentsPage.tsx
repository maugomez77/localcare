import { useEffect, useState } from "react";
import api from "../lib/api";
import StatusBadge from "../components/ui/StatusBadge";
import KpiCard from "../components/ui/KpiCard";

interface Payment {
  id: string;
  booking_id: string;
  family_id: string;
  family_name: string;
  caregiver_id: string;
  caregiver_name: string;
  amount: number;
  commission: number;
  net_payout: number;
  status: string;
  paid_at: string;
}

interface PaymentSummary {
  total_revenue: number;
  total_commission: number;
  total_payouts: number;
  pending_amount: number;
  pending_commission: number;
  completed_payments: number;
  pending_payments: number;
  commission_rate: number;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/payments"),
      api.get("/api/payments/summary"),
    ]).then(([paymentsRes, summaryRes]) => {
      setPayments(paymentsRes.data.payments);
      setSummary(summaryRes.data);
      setLoading(false);
    });
  }, []);

  if (loading || !summary) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Revenue"
          value={`$${summary.total_revenue.toLocaleString()}`}
          subtitle={`${summary.completed_payments} completed payments`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <KpiCard
          title="Platform Commission"
          value={`$${summary.total_commission.toLocaleString()}`}
          subtitle="15% commission rate"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          }
        />
        <KpiCard
          title="Caregiver Payouts"
          value={`$${summary.total_payouts.toLocaleString()}`}
          subtitle="Net amount to caregivers"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <KpiCard
          title="Pending Amount"
          value={`$${summary.pending_amount.toLocaleString()}`}
          subtitle={`${summary.pending_payments} pending payments`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-purple-100">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Payment ID</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Booking</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Family</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Caregiver</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Amount</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Commission</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Net Payout</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-purple-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{p.booking_id}</td>
                  <td className="px-6 py-4 text-gray-900">{p.family_name}</td>
                  <td className="px-6 py-4 text-gray-600">{p.caregiver_name}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    ${p.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-rose-600 font-medium">
                    ${p.commission.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-emerald-600 font-medium">
                    ${p.net_payout.toLocaleString()}
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                  <td className="px-6 py-4 text-gray-600">{p.paid_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
