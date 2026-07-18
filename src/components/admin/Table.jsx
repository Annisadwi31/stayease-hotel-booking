import React from "react";

const Table = ({ columns, children }) => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-sm font-semibold text-slate-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;