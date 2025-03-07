import React from "react";
import { NavLink } from "react-router-dom";
import person from "../assets/images/person.png";

const AdminNavBar = () => {
  return (
    <nav className="bg-white flex flex-col shadow-lg h-screen w-48 text-slate-900 text-md font-medium fixed px-4">
      {/* Admin Profile */}
      <div className="mb-10 text-center mt-6">
        <img
          src={person}
          alt="Admin Avatar"
          className="w-14 h-14 mx-auto mb-2 rounded-full"
        />
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-6 text-center mt-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `hover:underline hover:text-blue-500 transition ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/banners"
          className={({ isActive }) =>
            `hover:underline hover:text-blue-500 transition ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Banners
        </NavLink>
        <NavLink
          to="/admin/product-manage"
          className={({ isActive }) =>
            `hover:underline hover:text-blue-500 transition ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/inventory"
          className={({ isActive }) =>
            `hover:underline hover:text-blue-500 transition ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="/admin/order-manage"
          className={({ isActive }) =>
            `hover:underline hover:text-blue-500 transition ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            `hover:underline hover:text-blue-500 transition ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Customers
        </NavLink>

        {/* Logout Button */}
        <NavLink
          to="/logout"
          className="text-red-500 font-semibold hover:bg-red-100 transition p-2 rounded-md"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNavBar;


