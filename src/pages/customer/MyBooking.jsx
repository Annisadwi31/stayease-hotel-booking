import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import BookingCard from "../../components/customer/BookingCard";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    console.log("User Login:", user.id);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        rooms (
          nama,
          gambar
        )
      `)
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });

    console.log("Data Booking:", data);
    console.log("Error:", error);

    if (error) {
      console.error(error);
    } else {
      setBookings(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Memuat booking...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-semibold text-slate-900">
            Booking Saya
          </h1>

          <p className="mt-3 text-slate-500">
            Daftar reservasi kamar Anda.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            Anda belum memiliki booking.
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                id={booking.id}
                room={booking.rooms?.nama}
                image={booking.rooms?.gambar}
                date={`${booking.check_in} - ${booking.check_out}`}
                status={booking.status}
                price={`Rp ${Number(booking.total_harga).toLocaleString("id-ID")}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBooking;