import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHotel,
  FaSwimmer,
  FaUtensils,
  FaWifi,
  FaCar,
  FaQuoteLeft,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";

import Button from "../../components/common/Button";
import RoomCard from "../../components/customer/RoomCard";
import SearchBar from "../../components/customer/SearchBar";

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .limit(3);

    if (error) {
      console.log(error);
    } else {
      setRooms(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

            <div className="space-y-8">

              <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <FaHotel />
                StayEase Hotel Booking
              </p>

              <h1 className="text-5xl font-bold sm:text-6xl">
                Pesan Penginapan Impian Anda dengan Mudah
              </h1>

              <p className="max-w-xl text-lg text-slate-600">
                Temukan kamar hotel terbaik dengan proses reservasi yang cepat,
                aman, dan nyaman.
              </p>

              <div className="flex gap-4">

                <Link to="/rooms">
                  <Button>Cari Kamar</Button>
                </Link>

                <Link to="/about">
                  <Button variant="secondary">
                    Pelajari Selengkapnya
                  </Button>
                </Link>

              </div>

            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-10 text-white">

              <div className="space-y-6">

                <p className="uppercase tracking-[0.3em] text-blue-300 text-sm">
                  StayEase Hotel
                </p>

                <h2 className="text-4xl font-bold">
                  Pengalaman Menginap Terbaik
                </h2>

                <p className="text-slate-300">
                  Nikmati hotel modern dengan fasilitas premium dan pelayanan
                  terbaik.
                </p>

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm">Tamu</p>
                    <h3 className="text-3xl font-bold">1.245+</h3>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm">Kamar</p>
                    <h3 className="text-3xl font-bold">68</h3>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="rounded-[2rem] bg-white p-8 shadow">

          <h2 className="text-3xl font-semibold">
            Cari Kamar
          </h2>

          <p className="mt-2 text-slate-500">
            Temukan kamar terbaik sesuai kebutuhan Anda.
          </p>

          <div className="mt-6">
            <SearchBar />
          </div>

        </div>

      </section>

      {/* Featured Rooms */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-semibold">
              Kamar Unggulan
            </h2>

            <p className="mt-2 text-slate-500">
              Pilihan kamar terbaik untuk Anda.
            </p>

          </div>

          <Link to="/rooms">
            <Button variant="ghost">
              Lihat Semua
            </Button>
          </Link>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-500">
              Belum ada data kamar.
            </div>
          )}

        </div>

      </section>

      {/* Facilities */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="rounded-[2rem] bg-white p-8 shadow">

          <h2 className="text-3xl font-semibold">
            Fasilitas Hotel
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <FaSwimmer className="text-3xl text-blue-600" />

              <div>
                <h3 className="font-semibold">
                  Kolam Renang
                </h3>

                <p className="text-sm text-slate-500">
                  Kolam renang indoor yang nyaman.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <FaUtensils className="text-3xl text-orange-500" />

              <div>
                <h3 className="font-semibold">
                  Restoran
                </h3>

                <p className="text-sm text-slate-500">
                  Hidangan lokal dan internasional.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <FaWifi className="text-3xl text-sky-500" />

              <div>
                <h3 className="font-semibold">
                  WiFi Gratis
                </h3>

                <p className="text-sm text-slate-500">
                  Internet cepat di seluruh area hotel.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <FaCar className="text-3xl text-slate-700" />

              <div>
                <h3 className="font-semibold">
                  Area Parkir
                </h3>

                <p className="text-sm text-slate-500">
                  Area parkir luas dan aman.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Testimoni */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="rounded-[2rem] bg-white p-8 shadow">

          <h2 className="text-3xl font-semibold">
            Testimoni Pelanggan
          </h2>

          <div className="mt-8 rounded-2xl border p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-full bg-blue-100 p-3">
                <FaQuoteLeft className="text-blue-600" />
              </div>

              <div>

                <h3 className="font-semibold">
                  Rina Putri
                </h3>

                <p className="text-sm text-slate-500">
                  Wisatawan
                </p>

              </div>

            </div>

            <p className="mt-6 text-slate-600">
              "Pelayanan sangat ramah, kamar bersih, proses booking cepat,
              dan fasilitas hotel sangat lengkap. Sangat direkomendasikan."
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;