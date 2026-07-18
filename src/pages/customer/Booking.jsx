import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { supabase } from "../../supabase/supabaseClient";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [room, setRoom] = useState(null);

  const [form, setForm] = useState({
    check_in: "",
    check_out: "",
    jumlah_tamu: 1,
  });

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setRoom(data);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login terlebih dahulu",
      });

      navigate("/login");
      return;
    }

    if (!room) return;

    const checkIn = new Date(form.check_in);
    const checkOut = new Date(form.check_out);

    const diff =
      (checkOut.getTime() - checkIn.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff <= 0) {
      Swal.fire({
        icon: "error",
        title: "Tanggal tidak valid",
      });
      return;
    }

    const totalHarga = diff * room.harga;

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_id: user.id,
          room_id: room.id,
          check_in: form.check_in,
          check_out: form.check_out,
          jumlah_tamu: Number(form.jumlah_tamu),
          total_harga: totalHarga,
          status: "Pending",
        },
      ]);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Booking gagal",
        text: error.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Booking berhasil",
    });

    navigate("/my-booking");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-xl">

        <h1 className="text-3xl font-semibold text-slate-900">
          Booking Kamar
        </h1>

        {room && (
          <div className="mt-5 rounded-xl bg-slate-100 p-5">

            <h2 className="text-xl font-semibold">
              {room.nama}
            </h2>

            <p className="mt-2 text-slate-600">
              {room.deskripsi}
            </p>

            <p className="mt-3 font-semibold text-blue-600">
              Rp {Number(room.harga).toLocaleString("id-ID")} / malam
            </p>

          </div>
        )}

        <form
          onSubmit={handleBooking}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >

          <Input
            label="Check In"
            type="date"
            name="check_in"
            value={form.check_in}
            onChange={handleChange}
            required
          />

          <Input
            label="Check Out"
            type="date"
            name="check_out"
            value={form.check_out}
            onChange={handleChange}
            required
          />

          <Input
            label="Jumlah Tamu"
            type="number"
            name="jumlah_tamu"
            min="1"
            max={room?.kapasitas}
            value={form.jumlah_tamu}
            onChange={handleChange}
            required
          />

          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full"
            >
              Booking Sekarang
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Booking;