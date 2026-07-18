import React, { useEffect, useState } from "react";
import {
  FaBed,
  FaCalendarCheck,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import StatCard from "../../components/admin/StatCard";

const Dashboard = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    // Total Kamar
    const { count: roomCount } = await supabase
      .from("rooms")
      .select("*", { count: "exact", head: true });

    // Total Booking
    const { count: bookingCount } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true });

    // Total Customer
    const { count: customerCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", 2);

    // Pendapatan
    const { data: bookingData } = await supabase
      .from("bookings")
      .select("total_harga")
      .eq("status", "confirmed");

    let total = 0;

    if (bookingData) {
      bookingData.forEach((item) => {
        total += Number(item.total_harga);
      });
    }

    setTotalRooms(roomCount || 0);
    setTotalBookings(bookingCount || 0);
    setTotalCustomers(customerCount || 0);
    setRevenue(total);
  };

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard Admin
        </h1>

        <p className="mt-2 text-slate-500">
          Selamat datang di Dashboard Admin StayEase Hotel.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          label="Total Kamar"
          value={totalRooms}
          icon={<FaBed />}
        />

        <StatCard
          label="Total Booking"
          value={totalBookings}
          icon={<FaCalendarCheck />}
        />

        <StatCard
          label="Total Pendapatan"
          value={`Rp ${revenue.toLocaleString("id-ID")}`}
          icon={<FaDollarSign />}
        />

        <StatCard
          label="Total Customer"
          value={totalCustomers}
          icon={<FaUsers />}
        />

      </div>

    </div>
  );
};

export default Dashboard;