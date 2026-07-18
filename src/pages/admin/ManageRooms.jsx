import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Table from "../../components/admin/Table";

const initialForm = {
  nama: "",
  tipe: "",
  harga: "",
  kapasitas: "",
  stok: "",
  deskripsi: "",
  fasilitas: "",
  gambar: "",
};

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState(initialForm);

  const columns = [
    "ID",
    "Nama",
    "Tipe",
    "Harga",
    "Kapasitas",
    "Stok",
    "Aksi",
  ];

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("id");

    if (!error) {
      setRooms(data);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openAdd = () => {
    setEditing(false);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEdit = (room) => {
    setEditing(true);
    setForm(room);
    setShowModal(true);
  };

  const saveRoom = async (e) => {
    e.preventDefault();

    if (editing) {
      await supabase
        .from("rooms")
        .update({
          nama: form.nama,
          tipe: form.tipe,
          harga: form.harga,
          kapasitas: form.kapasitas,
          stok: form.stok,
          deskripsi: form.deskripsi,
          fasilitas: form.fasilitas,
          gambar: form.gambar,
        })
        .eq("id", form.id);
    } else {
      await supabase.from("rooms").insert({
        nama: form.nama,
        tipe: form.tipe,
        harga: form.harga,
        kapasitas: form.kapasitas,
        stok: form.stok,
        deskripsi: form.deskripsi,
        fasilitas: form.fasilitas,
        gambar: form.gambar,
      });
    }

    setShowModal(false);
    getRooms();
  };

  const deleteRoom = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus kamar?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("rooms")
      .delete()
      .eq("id", id);

    getRooms();
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between rounded-3xl bg-white p-8 shadow">

        <div>
          <h1 className="text-3xl font-bold">
            Manage Rooms
          </h1>

          <p className="mt-2 text-slate-500">
            Kelola data kamar hotel.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Tambah Kamar
        </button>

      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow">
          Memuat...
        </div>
      ) : (
        <Table columns={columns}>
          {rooms.map((room) => (
            <tr
              key={room.id}
              className="hover:bg-slate-50"
            >
              <td className="px-6 py-4">{room.id}</td>

              <td className="px-6 py-4">
                {room.nama}
              </td>

              <td className="px-6 py-4">
                {room.tipe}
              </td>

              <td className="px-6 py-4">
                Rp{" "}
                {Number(room.harga).toLocaleString("id-ID")}
              </td>

              <td className="px-6 py-4">
                {room.kapasitas}
              </td>

              <td className="px-6 py-4">
                {room.stok}
              </td>

              <td className="px-6 py-4 space-x-2">

                <button
                  onClick={() => openEdit(room)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteRoom(room.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  Hapus
                </button>

              </td>

            </tr>
          ))}
        </Table>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

          <form
            onSubmit={saveRoom}
            className="w-full max-w-lg rounded-2xl bg-white p-8"
          >

            <h2 className="mb-6 text-2xl font-bold">
              {editing ? "Edit Kamar" : "Tambah Kamar"}
            </h2>

            <div className="space-y-4">

              <input
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama Kamar"
                className="w-full rounded border p-3"
                required
              />

              <input
                name="tipe"
                value={form.tipe}
                onChange={handleChange}
                placeholder="Tipe"
                className="w-full rounded border p-3"
                required
              />

              <input
                name="harga"
                type="number"
                value={form.harga}
                onChange={handleChange}
                placeholder="Harga"
                className="w-full rounded border p-3"
              />

              <input
                name="kapasitas"
                type="number"
                value={form.kapasitas}
                onChange={handleChange}
                placeholder="Kapasitas"
                className="w-full rounded border p-3"
              />

              <input
                name="stok"
                type="number"
                value={form.stok}
                onChange={handleChange}
                placeholder="Stok"
                className="w-full rounded border p-3"
              />

              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsi"
                className="w-full rounded border p-3"
              />

              <textarea
                name="fasilitas"
                value={form.fasilitas}
                onChange={handleChange}
                placeholder="Fasilitas"
                className="w-full rounded border p-3"
              />

              <input
                name="gambar"
                value={form.gambar}
                onChange={handleChange}
                placeholder="Link Gambar"
                className="w-full rounded border p-3"
              />

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded bg-gray-300 px-5 py-2"
              >
                Batal
              </button>

              <button
                type="submit"
                className="rounded bg-blue-600 px-5 py-2 text-white"
              >
                Simpan
              </button>

            </div>

          </form>

        </div>
      )}
    </div>
  );
};

export default ManageRooms;