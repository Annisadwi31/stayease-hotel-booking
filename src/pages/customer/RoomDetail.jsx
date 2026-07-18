import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import Button from "../../components/common/Button";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoom();
  }, [id]);

  const getRoom = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setRoom(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Memuat data kamar...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Kamar tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Detail */}
          <div className="overflow-hidden rounded-3xl bg-white shadow">

            <img
              src={room.gambar}
              alt={room.nama}
              className="h-96 w-full object-cover"
            />

            <div className="p-8">

              <div className="flex items-center justify-between">

                <h1 className="text-4xl font-bold text-slate-900">
                  {room.nama}
                </h1>

                <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                  {room.tipe}
                </span>

              </div>

              <p className="mt-5 text-slate-600 leading-7">
                {room.deskripsi}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl border p-6">
                  <p className="text-slate-500 text-sm">
                    Harga
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-blue-600">
                    Rp {Number(room.harga).toLocaleString("id-ID")}
                  </h2>

                  <p className="text-slate-500">
                    / malam
                  </p>
                </div>

                <div className="rounded-2xl border p-6">
                  <p className="text-slate-500 text-sm">
                    Kapasitas
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {room.kapasitas} Orang
                  </h2>
                </div>

              </div>

              <div className="mt-8 flex gap-4">

                {room.stok > 0 ? (
                  <Link to={`/booking/${room.id}`}>
                    <Button>
                      Pesan Sekarang
                    </Button>
                  </Link>
                ) : (
                  <Button disabled>
                    Kamar Penuh
                  </Button>
                )}

                <Button
                  variant="secondary"
                  onClick={() => navigate("/rooms")}
                >
                  Kembali
                </Button>

              </div>

            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold mb-6">
                Informasi Kamar
              </h2>

              <div className="space-y-5">

                <div>
                  <p className="text-slate-500">Tipe</p>
                  <p className="font-semibold">{room.tipe}</p>
                </div>

                <div>
                  <p className="text-slate-500">Kapasitas</p>
                  <p className="font-semibold">
                    {room.kapasitas} Orang
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Stok Tersedia</p>

                  <p
                    className={`font-semibold ${
                      room.stok > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {room.stok} Kamar
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 mb-2">
                    Fasilitas
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {room.fasilitas.split(",").map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RoomDetail;