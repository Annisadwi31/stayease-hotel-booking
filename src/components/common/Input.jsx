import React from "react";

const Input = ({ label, as = "input", className = "", ...props }) => {
  const sharedClasses =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <label className="block text-sm font-medium text-slate-700">
      {label && <span className="mb-2 block">{label}</span>}
      {as === "textarea" ? (
        <textarea className={`${sharedClasses} ${className}`} {...props} />
      ) : (
        <input className={`${sharedClasses} ${className}`} {...props} />
      )}
    </label>
  );
};

export default Input;
