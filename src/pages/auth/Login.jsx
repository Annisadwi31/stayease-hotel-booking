import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { supabase } from "../../supabase/supabaseClient";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error("User tidak ditemukan.");
      }

      // Ambil role dari profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role_id")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      await Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang!",
        timer: 1500,
        showConfirmButton: false,
      });

      switch (profile.role_id) {
        case 1:
          navigate("/admin", { replace: true });
          break;

        case 2:
          navigate("/", { replace: true });
          break;

        case 3:
          navigate("/receptionist", { replace: true });
          break;

        case 4:
          navigate("/housekeeping", { replace: true });
          break;

        default:
          navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

        <h1 className="text-3xl font-bold text-slate-900 text-center">
          Login
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Masuk ke akun Anda
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <Input
            label="Email"
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
          </Button>

        </form>

        <div className="mt-6 text-center text-sm">

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Lupa Password?
          </Link>

          <p className="mt-4 text-slate-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Daftar
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;