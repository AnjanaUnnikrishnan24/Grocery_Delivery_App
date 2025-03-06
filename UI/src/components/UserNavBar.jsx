import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const UserNavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock user data (Replace with actual user authentication logic)
  const user = {
    isLoggedIn: true, // Change this dynamically based on authentication state
    name: "John Doe",
    avatar: "", // If empty, fallback to initials
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex flex-wrap justify-between items-center py-3 px-6">
        <div className="text-4xl font-bold text-green-600">
          GroFresh Basket
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 w-full lg:w-auto mt-3 lg:mt-0 max-w-lg">
          <label htmlFor="search" className="sr-only">Search for products</label>
          <input
            id="search"
            type="text"
            placeholder="Search for products"
            className="border border-gray-300 rounded-md py-2 px-4 w-full lg:w-[500px] focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all">
            Search
          </button>
        </div>

        {/* User Avatar & Dropdown */}
        <div className="relative">
          {user.isLoggedIn ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* Avatar (Fallback to initials if no image) */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                  {user.name[0]}
                </div>
              )}
              <span className="font-medium">{user.name}</span>
            </div>
          ) : (
            <Link to="/signin" className="hover:underline">Sign In</Link>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && user.isLoggedIn && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/cart"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Cart
              </Link>
              <Link
                to="/cart"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Order History
              </Link>
              
              <div className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                <Logout />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="bg-white py-1 shadow-md flex justify-end items-center px-8 text-slate-900 text-xl font-medium">
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">All Categories</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
