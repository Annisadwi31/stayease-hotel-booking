import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Card from "../../components/common/Card";

const Reports = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [pending, setPending] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [checkin, setCheckin] = useState(0);
  const [checkout, setCheckout] = useState(0);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    // Rooms
    const { count: roomCount } = await supabase
      .from("rooms")
      .select("*", { count: "exact", head: true });

    setTotalRooms(roomCount || 0);

    // Customer
    const { count: customerCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", 2);

    setTotalCustomers(customerCount || 0);

    // Booking
    const { data: bookings } = await supabase
      .from("bookings")
      .select("*");

    if (bookings) {
      setTotalBookings(bookings.length);

      let revenue = 0;

      let p = 0;
      let c = 0;
      let ci = 0;
      let co = 0;

      bookings.forEach((booking) => {
        revenue += Number(booking.total_harga);

        switch (booking.status?.toLowerCase()) {
          case "pending":
            p++;
            break;

          case "confirmed":
            c++;
            break;

          case "check in":
            ci++;
            break;

          case "check out":
            co++;
            break;

          default:
            break;
        }
      });

      setPending(p);
      setConfirmed(c);
      setCheckin(ci);
      setCheckout(co);
      setTotalRevenue(revenue);
    }
  };

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="mt-2 text-slate-500">
          Laporan statistik hotel secara keseluruhan.
        </p>
      </div>

      {/* Statistik */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <h2 className="text-lg font-semibold">
            Total Kamar
          </h2>

          <p className="mt-4 text-4xl font-bold text-blue-600">
            {totalRooms}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            Total Booking
          </h2>

          <p className="mt-4 text-4xl font-bold text-green-600">
            {totalBookings}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            Total Customer
          </h2>

          <p className="mt-4 text-4xl font-bold text-purple-600">
            {totalCustomers}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            Total Pendapatan
          </h2>

          <p className="mt-4 text-2xl font-bold text-red-600">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
        </Card>

      </div>

      {/* Status Booking */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <h2 className="font-semibold">
            Pending
          </h2>

          <p className="mt-4 text-4xl font-bold text-yellow-500">
            {pending}
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold">
            Confirmed
          </h2>

          <p className="mt-4 text-4xl font-bold text-blue-500">
            {confirmed}
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold">
            Check In
          </h2>

          <p className="mt-4 text-4xl font-bold text-green-500">
            {checkin}
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold">
            Check Out
          </h2>

          <p className="mt-4 text-4xl font-bold text-slate-700">
            {checkout}
          </p>
        </Card>

      </div>

    </div>
  );
};

export default Reports;