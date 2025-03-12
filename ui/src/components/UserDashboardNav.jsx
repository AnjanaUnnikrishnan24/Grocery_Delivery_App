import React from "react";
import { Link } from "react-router-dom";

const UserDashboardNav = () => {
  return (
    <nav className="bg-white py-2 shadow flex flex-wrap space-x-6 sm:space-x-10 text-slate-900 text-md font-medium px-6">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/profile" className="hover:underline">My Profile</Link>
      <Link to="/orders" className="hover:underline">Order History</Link>
      <Link to="/logout" className="hover:underline ml-auto">Logout</Link>
    </nav>
  );
};

export default UserDashboardNav;
