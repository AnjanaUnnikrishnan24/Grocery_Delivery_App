import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import person from "../assets/images/person.png";
import useProfile from "../../../hooks/useProfile";

const UserNavBar = () => {
  const { profile: user, loading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center px-6 md:px-10 lg:px-16 justify-between border-b border-gray-200">
        <div className="text-2xl font-bold text-green-600">GroFresh Basket</div>

        <div className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/listing" className="hover:text-green-600 transition">All Products</Link>
          <Link to="/about" className="hover:text-green-600 transition">About Us</Link>
          <Link to="/contacts" className="hover:text-green-600 transition">Contact Us</Link>
          <Link to="/cart" className="hover:text-green-600 transition">Cart</Link>
          <Link to="/orders" className="hover:text-green-600 transition">Order History</Link>
        </div>

        <div className="flex items-center space-x-6">
          {loading ? (
            <span className="text-gray-600">Loading...</span>
          ) : user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin-dashboard" : "/profile"}
                className="flex items-center space-x-2 hover:text-green-600 transition"
              >
                <img
                  src={user.avatar || person}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                  onError={(e) => (e.target.src = person)}
                />
                <span className="font-medium text-gray-800">{user.name}</span>
              </Link>

              <Logout />
            </>
          ) : (
            <Link
              to="/signin"
              className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition"
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
