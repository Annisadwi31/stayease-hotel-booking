import React from "react";

const CleaningSchedule = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-6">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Cleaning Schedule</h1>
          <p className="mt-3 text-slate-500">View daily housekeeping assignments and priorities.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Morning Shift</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>Room 101 - Cleaned</li>
              <li>Room 102 - In Progress</li>
              <li>Room 103 - Pending</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Afternoon Shift</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>Room 201 - Pending</li>
              <li>Room 202 - Pending</li>
              <li>Room 203 - Pending</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningSchedule;
