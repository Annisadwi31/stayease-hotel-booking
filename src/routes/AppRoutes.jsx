import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
import ReceptionistLayout from "../layouts/ReceptionistLayout";
import HousekeepingLayout from "../layouts/HousekeepingLayout";

import ProtectedRoute from "./ProtectedRoute";

// Customer
import Home from "../pages/customer/Home";
import Rooms from "../pages/customer/Rooms";
import RoomDetail from "../pages/customer/RoomDetail";
import Booking from "../pages/customer/Booking";
import MyBooking from "../pages/customer/MyBooking";
import Profile from "../pages/customer/Profile";
import About from "../pages/customer/About";
import Contact from "../pages/customer/Contact";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import ManageRooms from "../pages/admin/ManageRooms";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageUsers from "../pages/admin/ManageUsers";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

// Receptionist
import ReceptionistDashboard from "../pages/receptionist/Dashboard";
import Reservations from "../pages/receptionist/Reservations";
import CheckIn from "../pages/receptionist/CheckIn";
import CheckOut from "../pages/receptionist/CheckOut";

// Housekeeping
import HousekeepingDashboard from "../pages/housekeeping/Dashboard";
import RoomStatus from "../pages/housekeeping/RoomStatus";
import CleaningSchedule from "../pages/housekeeping/CleaningSchedule";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route
          path="/"
          element={
            <CustomerLayout>
              <Home />
            </CustomerLayout>
          }
        />

        <Route
          path="/rooms"
          element={
            <CustomerLayout>
              <Rooms />
            </CustomerLayout>
          }
        />

        <Route
          path="/rooms/:id"
          element={
            <CustomerLayout>
              <RoomDetail />
            </CustomerLayout>
          }
        />

        <Route
          path="/about"
          element={
            <CustomerLayout>
              <About />
            </CustomerLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <CustomerLayout>
              <Contact />
            </CustomerLayout>
          }
        />

        <Route
          path="/login"
          element={
            <CustomerLayout>
              <Login />
            </CustomerLayout>
          }
        />

        <Route
          path="/register"
          element={
            <CustomerLayout>
              <Register />
            </CustomerLayout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <CustomerLayout>
              <ForgotPassword />
            </CustomerLayout>
          }
        />

        {/* ================= CUSTOMER ================= */}

<Route
  path="/booking/:id"
  element={
    <ProtectedRoute allowedRoles={[2]}>
      <CustomerLayout>
        <Booking />
      </CustomerLayout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/my-booking"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <CustomerLayout>
                <MyBooking />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={[2]}>
              <CustomerLayout>
                <Profile />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminLayout>
                <ManageRooms />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminLayout>
                <ManageBookings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminLayout>
                <ManageUsers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminLayout>
                <Reports />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= RECEPTIONIST ================= */}

        <Route
          path="/receptionist"
          element={
            <ProtectedRoute allowedRoles={[3]}>
              <ReceptionistLayout>
                <ReceptionistDashboard />
              </ReceptionistLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist/reservations"
          element={
            <ProtectedRoute allowedRoles={[3]}>
              <ReceptionistLayout>
                <Reservations />
              </ReceptionistLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist/checkin"
          element={
            <ProtectedRoute allowedRoles={[3]}>
              <ReceptionistLayout>
                <CheckIn />
              </ReceptionistLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist/checkout"
          element={
            <ProtectedRoute allowedRoles={[3]}>
              <ReceptionistLayout>
                <CheckOut />
              </ReceptionistLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= HOUSEKEEPING ================= */}

        <Route
          path="/housekeeping"
          element={
            <ProtectedRoute allowedRoles={[4]}>
              <HousekeepingLayout>
                <HousekeepingDashboard />
              </HousekeepingLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/housekeeping/room-status"
          element={
            <ProtectedRoute allowedRoles={[4]}>
              <HousekeepingLayout>
                <RoomStatus />
              </HousekeepingLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/housekeeping/cleaning-schedule"
          element={
            <ProtectedRoute allowedRoles={[4]}>
              <HousekeepingLayout>
                <CleaningSchedule />
              </HousekeepingLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;