import React from "react";

const RoomStatus = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-6">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Room Status</h1>
          <p className="mt-3 text-slate-500">Track room cleanliness and availability.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Clean</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">24</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Needs Cleaning</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">8</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Occupied</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">42</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomStatus;
