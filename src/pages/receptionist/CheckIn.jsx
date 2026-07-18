import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Button from "../../components/common/Button";

const CheckIn = () => {
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
        status,
        rooms:room_id (
          nama
        ),
        profiles:customer_id (
          nama
        )
      `)
      .eq("status", "Confirmed")
      .order("check_in", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setBookings(data);
    }

    setLoading(false);
  };

  const handleCheckIn = async (id) => {
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "checked_in",
      })
      .eq("id", id);

    if (error) {
      alert("Gagal Check In");
      console.log(error);
      return;
    }

    alert("Check In berhasil");
    getBookings();
  };

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Check In
        </h1>

        <p className="mt-2 text-slate-500">
          Konfirmasi tamu yang akan melakukan check in.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow">
          Memuat data...
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow">
          Tidak ada tamu yang akan check in.
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

            </div>

            <Button
              className="mt-6"
              onClick={() => handleCheckIn(booking.id)}
            >
              Confirm Check In
            </Button>
          </div>
        ))
      )}

    </div>
  );
};

export default CheckIn;