import React from "react";
import { Link } from "react-router-dom";
import person from "../assets/images/person.png"


const AdminNavBar = () => {
  return (
    <nav className="bg-white flex flex-col shadow-lg h-screen w-40 text-slate-900 text-md font-medium fixed">
      {/* Admin Profile */}
      <div className="mb-10 text-center mt-6">
        <img src={person} alt="Admin Avatar" className="w-12 h-12 mx-auto mb-2 rounded-full" />
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-6 text-center mt-4">
        <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/admin/banners" className="hover:underline">Banners</Link>
        <Link to="/admin/product-manage" className="hover:underline">Products</Link>
        <Link to="/admin/inventory" className="hover:underline">Inventory</Link>
        <Link to="/admin/order-manage" className="hover:underline">Orders</Link>
        <Link to="/admin/customers" className="hover:underline">Customers</Link>
        <Link to="/logout" className="hover:underline text-red-500">Logout</Link>
      </div>
    </nav>
  );
};

export default AdminNavBar;

