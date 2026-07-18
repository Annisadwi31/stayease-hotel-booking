import React from "react";
import Sidebar from "../components/layout/Sidebar";

const ReceptionistLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-8 px-6 py-10">
        <Sidebar role="receptionist" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default ReceptionistLayout;
