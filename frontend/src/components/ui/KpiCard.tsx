interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
}

export default function KpiCard({ title, value, subtitle, icon, trend }: KpiCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          {trend && <p className="mt-1 text-sm text-emerald-600 font-medium">{trend}</p>}
        </div>
        <div className="p-3 bg-purple-50 rounded-xl text-purple-600">{icon}</div>
      </div>
    </div>
  );
}
