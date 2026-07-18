import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

const Dashboard = () => {
  const [todayBooking, setTodayBooking] = useState(0);
  const [pending, setPending] = useState(0);
  const [checkin, setCheckin] = useState(0);
  const [checkout, setCheckout] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    let bookingHariIni = 0;
    let pendingCount = 0;
    let checkinCount = 0;
    let checkoutCount = 0;

    data.forEach((booking) => {
      if (booking.check_in === today) bookingHariIni++;

      if (booking.status?.toLowerCase() === "pending")
        pendingCount++;

      if (booking.status?.toLowerCase() === "check in")
        checkinCount++;

      if (booking.status?.toLowerCase() === "check out")
        checkoutCount++;
    });

    setTodayBooking(bookingHariIni);
    setPending(pendingCount);
    setCheckin(checkinCount);
    setCheckout(checkoutCount);
  };

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Receptionist Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Kelola reservasi, check in, dan check out pelanggan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-slate-500">
            Booking Hari Ini
          </p>

          <h2 className="mt-4 text-4xl font-bold text-blue-600">
            {todayBooking}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-slate-500">
            Pending
          </p>

          <h2 className="mt-4 text-4xl font-bold text-yellow-500">
            {pending}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-slate-500">
            Check In
          </p>

          <h2 className="mt-4 text-4xl font-bold text-green-600">
            {checkin}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-slate-500">
            Check Out
          </p>

          <h2 className="mt-4 text-4xl font-bold text-red-600">
            {checkout}
          </h2>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;