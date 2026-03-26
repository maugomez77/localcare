import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

const mobileNavItems = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/caregivers", label: "Caregivers" },
  { to: "/app/families", label: "Families" },
  { to: "/app/bookings", label: "Bookings" },
  { to: "/app/reviews", label: "Reviews" },
  { to: "/app/payments", label: "Payments" },
];

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const pageTitle = (() => {
    const path = location.pathname;
    if (path === "/app") return "Dashboard";
    if (path.startsWith("/app/caregivers/")) return "Caregiver Profile";
    if (path === "/app/caregivers") return "Caregivers";
    if (path === "/app/families") return "Families";
    if (path === "/app/bookings") return "Bookings";
    if (path === "/app/reviews") return "Reviews";
    if (path === "/app/payments") return "Payments";
    return "Dashboard";
  })();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />

      {/* Demo Mode Banner */}
      <div className="lg:pl-64">
        <div className="bg-gradient-to-r from-purple-600 to-rose-500 text-white text-center py-2 px-4 text-sm font-medium">
          Demo Mode — Exploring LocalCare with sample data
          <Link to="/" className="ml-3 underline underline-offset-2 hover:text-purple-100">
            Back to Home
          </Link>
        </div>

        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-100">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-700">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-purple-100 shadow-lg">
            <nav className="px-4 py-3 space-y-1">
              {mobileNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/app"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
