import React from "react";

const StatCard = ({ label, value, icon, className = "" }) => {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">{icon}</div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
};

export default StatCard;
