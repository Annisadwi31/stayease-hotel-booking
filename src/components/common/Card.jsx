import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
