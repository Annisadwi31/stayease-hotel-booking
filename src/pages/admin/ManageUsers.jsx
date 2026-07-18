import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Table from "../../components/admin/Table";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  const columns = [
    "ID",
    "Nama",
    "Email",
    "Role",
    "Status",
    "Aksi",
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setUsers(data);
    } else {
      console.log(error);
    }

    setLoading(false);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user?")) return;

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (!error) {
      getUsers();
    }
  };

  const getRole = (role) => {
    switch (Number(role)) {
      case 1:
        return "Admin";
      case 2:
        return "Customer";
      case 3:
        return "Receptionist";
      case 4:
        return "Housekeeping";
      default:
        return "-";
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.nama} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const currentUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>

        <p className="mt-2 text-slate-500">
          Kelola seluruh pengguna sistem.
        </p>

        <input
          type="text"
          placeholder="Cari nama atau email..."
          className="mt-6 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow">
          Memuat data...
        </div>
      ) : (
        <>
          <Table columns={columns}>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">

                  <td className="px-6 py-4">
                    {user.id.slice(0, 8)}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {user.nama}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {getRole(user.role)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        user.status === "Inactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.status ?? "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-slate-500"
                >
                  Tidak ada data.
                </td>
              </tr>
            )}
          </Table>

          {/* Pagination */}

          <div className="flex justify-center gap-2">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              {page}
            </span>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;