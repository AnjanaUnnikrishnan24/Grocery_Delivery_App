import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <header className="bg-green-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-xl font-semibold">GroFresh Basket Admin</h1>
      <div className="flex items-center gap-4">
        <NavLink
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/"
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm"
        >
          Logout
        </NavLink>
      </div>
    </header>
  );
};

export default AdminNavBar;



