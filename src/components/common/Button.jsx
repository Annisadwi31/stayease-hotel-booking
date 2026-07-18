import React from "react";

const Button = ({ children, type = "button", variant = "primary", className = "", ...props }) => {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 focus:ring-slate-400",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
  };

  return (
    <button type={type} className={`${baseClass} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
