import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Button from "../../components/common/Button";

const CheckOut = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        check_in,
        check_out,
        total_harga,
        status,
        rooms:room_id (
          nama
        ),
        profiles:customer_id (
          nama
        )
      `)
      .eq("status", "checked_in")
      .order("check_out", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setBookings(data);
    }

    setLoading(false);
  };

  const handleCheckOut = async (id) => {
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "checked_out",
      })
      .eq("id", id);

    if (error) {
      alert("Check Out gagal");
      console.log(error);
      return;
    }

    alert("Check Out berhasil");
    getBookings();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Check Out
        </h1>

        <p className="mt-2 text-slate-500">
          Konfirmasi tamu yang akan melakukan check out.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow">
          Memuat data...
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow">
          Tidak ada tamu yang akan check out.
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-3xl bg-white p-6 shadow"
          >
            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <p className="text-sm text-slate-500">
                  Nama Customer
                </p>

                <h2 className="text-xl font-semibold">
                  {booking.profiles?.nama}
                </h2>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Nama Kamar
                </p>

                <h2 className="text-xl font-semibold">
                  {booking.rooms?.nama}
                </h2>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Check In
                </p>

                <h2>
                  {booking.check_in}
                </h2>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Check Out
                </p>

                <h2>
                  {booking.check_out}
                </h2>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total Pembayaran
                </p>

                <h2 className="font-semibold text-blue-600">
                  Rp {Number(booking.total_harga).toLocaleString("id-ID")}
                </h2>
              </div>

            </div>

            <Button
              className="mt-6"
              onClick={() => handleCheckOut(booking.id)}
            >
              Confirm Check Out
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default CheckOut;