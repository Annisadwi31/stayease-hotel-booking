import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nama || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi data",
        text: "Semua field wajib diisi.",
      });
      return;
    }

    setLoading(true);

    try {
      // Debug
      console.log("Nama :", nama);
      console.log("Email :", email);
      console.log("Password :", password);
      console.log("Type Email :", typeof email);

      await registerUser({
        nama: nama.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Silakan login menggunakan akun Anda.",
      });

      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR :", error);

      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.message || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-semibold text-slate-900">
          Daftar Akun
        </h1>

        <p className="mt-3 text-slate-500">
          Buat akun untuk mulai memesan kamar hotel.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan nama lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Daftar"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Register;