import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const CustomerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
