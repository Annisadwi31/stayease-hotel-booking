import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import RoomCard from "../../components/customer/RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error mengambil data:", error);
      setRooms([]);
    } else {
      console.log("Rooms:", data);
      setRooms(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Memuat data kamar...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-semibold text-slate-900">
            Daftar Kamar
          </h1>

          <p className="mt-3 text-slate-500">
            Pilih kamar terbaik sesuai kebutuhan Anda.
          </p>
        </div>

        {rooms.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            Belum ada data kamar.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Rooms;