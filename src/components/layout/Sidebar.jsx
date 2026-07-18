import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaTachometerAlt,
  FaDoorOpen,
  FaCalendarCheck,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBed,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";

const Sidebar = ({ role = "admin" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin logout?"
    );

    if (!confirmLogout) return;

    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  const menu = {
    admin: [
      {
        label: "Dashboard",
        to: "/admin",
        icon: <FaChartLine />,
      },
      {
        label: "Rooms",
        to: "/admin/rooms",
        icon: <FaBed />,
      },
      {
        label: "Bookings",
        to: "/admin/bookings",
        icon: <FaCalendarCheck />,
      },
      {
        label: "Users",
        to: "/admin/users",
        icon: <FaUsers />,
      },
      {
        label: "Reports",
        to: "/admin/reports",
        icon: <FaFileAlt />,
      },
      {
        label: "Settings",
        to: "/admin/settings",
        icon: <FaCog />,
      },
    ],

    receptionist: [
      {
        label: "Dashboard",
        to: "/receptionist",
        icon: <FaTachometerAlt />,
      },
      {
        label: "Reservations",
        to: "/receptionist/reservations",
        icon: <FaCalendarCheck />,
      },
      {
        label: "Check In",
        to: "/receptionist/checkin",
        icon: <FaDoorOpen />,
      },
      {
        label: "Check Out",
        to: "/receptionist/checkout",
        icon: <FaSignOutAlt />,
      },
    ],

    housekeeping: [
      {
        label: "Dashboard",
        to: "/housekeeping",
        icon: <FaChartLine />,
      },
      {
        label: "Room Status",
        to: "/housekeeping/room-status",
        icon: <FaBed />,
      },
      {
        label: "Cleaning Schedule",
        to: "/housekeeping/cleaning-schedule",
        icon: <FaFileAlt />,
      },
    ],
  };

  return (
    <aside className="w-full max-w-[280px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-8">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <FaChartLine className="h-6 w-6" />
        </div>

        <h2 className="text-xl font-semibold text-slate-900">
          Workspace
        </h2>

        <p className="text-sm text-slate-500">
          Manage hotel operations
        </p>
      </div>

      <nav className="space-y-2">

        {menu[role].map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-50 font-semibold text-blue-600"
                  : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-red-50 hover:text-red-600"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar;