import React from "react";
import Button from "../common/Button";

const SearchBar = () => {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <input type="text" placeholder="City, hotel, or location" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        <input type="date" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        <input type="number" min="1" placeholder="Guests" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        <Button variant="primary" className="w-full py-3">
          Search Rooms
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
