import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Button from "../common/Button";

const RoomCard = ({ room }) => {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">

      <div
        className="h-64 bg-slate-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${room.gambar})` }}
      />

      <div className="p-6">

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            {room.nama}
          </h3>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {room.tipe}
          </span>
        </div>

        <p className="mt-3 text-slate-500">
          {room.deskripsi}
        </p>

        <div className="mt-3 text-sm text-slate-500">
          Kapasitas: {room.kapasitas} Orang
        </div>

        <div className="mt-5 flex items-center justify-between">

          <div>
            <p className="text-lg font-semibold text-slate-900">
              Rp {Number(room.harga).toLocaleString("id-ID")} / malam
            </p>

            <div className="mt-2 flex items-center gap-1 text-amber-500">
              <FaStar />
              <span>5.0</span>
            </div>
          </div>

          <Link to={`/rooms/${room.id}`}>
            <Button
              variant="primary"
              className="px-4 py-2 text-sm"
            >
              Detail
            </Button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default RoomCard;