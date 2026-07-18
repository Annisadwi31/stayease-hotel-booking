import React from "react";
import { FaStar, FaClock, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* Kiri */}
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-blue-600">
              Tentang StayEase
            </p>

            <h1 className="mt-4 text-4xl font-semibold text-slate-900">
              Pengalaman Pemesanan Hotel Modern yang Mengutamakan Kenyamanan dan Kepercayaan
            </h1>

            <p className="mt-6 text-slate-600">
              StayEase merupakan platform pemesanan hotel yang memudahkan pengguna
              dalam mencari dan memesan kamar sesuai kebutuhan. Dengan tampilan yang
              sederhana, proses reservasi yang cepat, serta pelayanan yang terpercaya,
              StayEase hadir untuk memberikan pengalaman menginap yang lebih nyaman
              bagi setiap pelanggan.
            </p>
          </div>

          {/* Kanan */}
          <div className="space-y-4">

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <FaStar className="h-8 w-8 text-blue-600" />

              <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                Hotel Terpercaya
              </h2>

              <p className="mt-3 text-slate-600">
                Kami bekerja sama dengan berbagai hotel berkualitas untuk memberikan
                pengalaman menginap yang aman, nyaman, dan memuaskan.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <FaClock className="h-8 w-8 text-amber-500" />

              <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                Proses Reservasi Cepat
              </h2>

              <p className="mt-3 text-slate-600">
                Cari kamar, pilih tanggal menginap, dan lakukan pemesanan hanya
                dalam beberapa langkah yang mudah dan praktis.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <FaHeart className="h-8 w-8 text-rose-500" />

              <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                Kenyamanan Terjamin
              </h2>

              <p className="mt-3 text-slate-600">
                Nikmati fasilitas terbaik, pelayanan profesional, dan suasana hotel
                yang nyaman untuk membuat pengalaman menginap Anda lebih berkesan.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default About;