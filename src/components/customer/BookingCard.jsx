import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const BookingCard = ({
  id,
  room,
  image,
  date,
  status,
  price,
}) => {

  const statusColor = () => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">

      <div className="flex flex-col md:flex-row">

        {/* Gambar */}
        <img
          src={image}
          alt={room}
          className="h-64 w-full object-cover md:h-auto md:w-72"
        />

        {/* Isi */}
        <div className="flex flex-1 flex-col justify-between p-6">

          <div>

            <div className="flex items-center justify-between">

              <h3 className="text-2xl font-semibold text-slate-900">
                {room}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor()}`}
              >
                {status}
              </span>

            </div>

            <p className="mt-4 text-slate-500">
              <strong>Check In - Check Out</strong>
            </p>

            <p className="text-slate-700">
              {date}
            </p>

            <p className="mt-6 text-xl font-semibold text-blue-600">
              {price}
            </p>

          </div>

          <div className="mt-6">

            <Link to={`/booking/${id}`}>
              <Button variant="secondary">
                Lihat Detail
              </Button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookingCard;