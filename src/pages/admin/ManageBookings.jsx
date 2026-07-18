import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Table from "../../components/admin/Table";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    "ID",
    "Kamar",
    "Customer",
    "Check In",
    "Check Out",
    "Status",
    "Total",
    "Aksi",
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        rooms:room_id(
          nama
        ),
        profiles:customer_id(
          nama
        )
      `)
      .order("created_at", { ascending: false });

    if (!error) {
      setBookings(data);
    } else {
      console.log(error);
    }

    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    getBookings();
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus booking ini?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    getBookings();
  };

  const badgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "check in":
        return "bg-green-100 text-green-700";

      case "check out":
        return "bg-gray-200 text-gray-700";

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
          Manage Bookings
        </h1>

        <p className="mt-2 text-slate-500">
          Kelola seluruh reservasi pelanggan.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow">
          Memuat data...
        </div>
      ) : (
        <Table columns={columns}>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  {booking.id}
                </td>

                <td className="px-6 py-4">
                  {booking.rooms?.nama}
                </td>

                <td className="px-6 py-4">
                  {booking.profiles?.nama}
                </td>

                <td className="px-6 py-4">
                  {booking.check_in}
                </td>

                <td className="px-6 py-4">
                  {booking.check_out}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(
                        booking.id,
                        e.target.value
                      )
                    }
                    className={`rounded-full px-3 py-2 text-sm ${badgeColor(
                      booking.status
                    )}`}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Check In</option>
                    <option>Check Out</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td className="px-6 py-4 font-semibold">
                  Rp{" "}
                  {Number(
                    booking.total_harga
                  ).toLocaleString("id-ID")}
                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() =>
                      deleteBooking(booking.id)
                    }
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Hapus
                  </button>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="px-6 py-10 text-center text-slate-500"
              >
                Belum ada booking.
              </td>
            </tr>
          )}
        </Table>
      )}
    </div>
  );
};

export default ManageBookings;