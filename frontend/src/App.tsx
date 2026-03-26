import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CaregiversPage from "./pages/CaregiversPage";
import CaregiverProfilePage from "./pages/CaregiverProfilePage";
import FamiliesPage from "./pages/FamiliesPage";
import BookingsPage from "./pages/BookingsPage";
import ReviewsPage from "./pages/ReviewsPage";
import PaymentsPage from "./pages/PaymentsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="caregivers" element={<CaregiversPage />} />
        <Route path="caregivers/:id" element={<CaregiverProfilePage />} />
        <Route path="families" element={<FamiliesPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
      </Route>
    </Routes>
  );
}
