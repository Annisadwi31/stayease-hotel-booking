import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

const Settings = () => {
  const [loading, setLoading] = useState(false);

  const [setting, setSetting] = useState({
    id: 1,
    hotel_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setSetting(data);
  };

  const saveSettings = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("settings")
      .update({
        hotel_name: setting.hotel_name,
        email: setting.email,
        phone: setting.phone,
        address: setting.address,
      })
      .eq("id", setting.id);

    if (error) {
      alert("Gagal menyimpan");
      console.log(error);
    } else {
      alert("Berhasil disimpan");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Pengaturan informasi hotel.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Nama Hotel
          </label>

          <input
            type="text"
            value={setting.hotel_name}
            onChange={(e) =>
              setSetting({
                ...setting,
                hotel_name: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={setting.email}
            onChange={(e) =>
              setSetting({
                ...setting,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Nomor Telepon
          </label>

          <input
            type="text"
            value={setting.phone}
            onChange={(e) =>
              setSetting({
                ...setting,
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Alamat
          </label>

          <textarea
            rows={4}
            value={setting.address}
            onChange={(e) =>
              setSetting({
                ...setting,
                address: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <button
          onClick={saveSettings}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>

      </div>

    </div>
  );
};

export default Settings;