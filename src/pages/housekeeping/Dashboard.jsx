import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Housekeeping Dashboard</h1>
        <p className="mt-3 text-slate-500">Monitor room status and cleaning assignments.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Rooms Cleaned</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">32</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Rooms Pending</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">14</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Staff Available</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">6</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
