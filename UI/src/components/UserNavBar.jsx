import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const UserNavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      {/* Navbar Container */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center px-6 md:px-10 lg:px-16 justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600">GroFresh Basket</div>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/products" className="hover:text-green-600 transition">All Categories</Link>
          <Link to="/about" className="hover:text-green-600 transition">About Us</Link>
          <Link to="/contact" className="hover:text-green-600 transition">Contact Us</Link>
        </div>

        {/* User Avatar & Dropdown */}
        <div className="relative">
          {loading ? (
            <div className="text-gray-600">Loading...</div>
          ) : error ? (
            <Link to="/signin" className="text-green-600 font-medium hover:underline">Sign In</Link>
          ) : user ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* Avatar (Fallback to initials if no image) */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                  {user.name[0]}
                </div>
              )}
              <span className="font-medium text-gray-800">{user.name}</span>
            </div>
          ) : (
            <Link to="/signin" className="text-green-600 font-medium hover:underline">Sign In</Link>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && user && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 shadow-md rounded-md py-2">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Cart
              </Link>
              <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Order History
              </Link>
              <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                <Logout />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Prevent Content Overlap */}
      <div className="pt-1"></div>
    </>
  );
};

export default UserNavBar;
