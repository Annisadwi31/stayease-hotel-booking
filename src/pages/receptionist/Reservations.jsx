import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Table from "../../components/admin/Table";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    "Booking ID",
    "Customer",
    "Kamar",
    "Check In",
    "Check Out",
    "Status",
    "Total",
  ];

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        check_in,
        check_out,
        status,
        total_harga,
        rooms:room_id (
          nama
        ),
        profiles:customer_id (
          nama
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setReservations(data);
    setLoading(false);
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "check in":
        return "bg-green-100 text-green-700";

      case "check out":
        return "bg-gray-100 text-gray-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Reservations
        </h1>

        <p className="mt-2 text-slate-500">
          Daftar seluruh reservasi pelanggan.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow">
          Memuat data...
        </div>
      ) : (
        <Table columns={columns}>
          {reservations.length > 0 ? (
            reservations.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50">

                <td className="px-6 py-4">
                  {booking.id}
                </td>

                <td className="px-6 py-4">
                  {booking.profiles?.nama ?? "-"}
                </td>

                <td className="px-6 py-4">
                  {booking.rooms?.nama ?? "-"}
                </td>

                <td className="px-6 py-4">
                  {booking.check_in}
                </td>

                <td className="px-6 py-4">
                  {booking.check_out}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${statusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  Rp{" "}
                  {Number(booking.total_harga).toLocaleString("id-ID")}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-8 text-center text-slate-500"
              >
                Belum ada reservasi.
              </td>
            </tr>
          )}
        </Table>
      )}

    </div>
  );
};

export default Reservations;