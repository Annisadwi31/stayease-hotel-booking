import React from "react";
import Button from "../../components/common/Button";

const Profile = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">My Profile</h1>
            <p className="mt-3 text-slate-500">Manage your personal details and preferences.</p>
          </div>
          <Button>Update Profile</Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Alex Morgan</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">alex@example.com</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Phone</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">+62 812 3456 7890</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Member Since</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">January 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
