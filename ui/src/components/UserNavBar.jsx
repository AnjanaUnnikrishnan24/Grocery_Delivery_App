import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center px-6 md:px-10 lg:px-16 justify-between border-b border-gray-200">
        <div className="text-2xl font-bold text-green-600">GroFresh Basket</div>

        <div className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/listing" className="hover:text-green-600 transition">All Products</Link>
          <Link to="/about" className="hover:text-green-600 transition">About Us</Link>
          <Link to="/contacts" className="hover:text-green-600 transition">Contact Us</Link>
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="hover:text-green-600 transition">Cart</Link>
              <Link to="/orders" className="hover:text-green-600 transition">Order History</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/SignIn"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
      <div className="pt-16"></div>
    </>
  );
};

export default UserNavBar;

