import React from "react";

const UserNavBar = () => {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap justify-between items-center py-3 px-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-green-600">
            <a href="#">GroFresh Basket</a>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2 w-full lg:w-auto mt-3 lg:mt-0">
            <input
              type="text"
              placeholder="Search for products"
              className="border border-gray-300 rounded-md py-2 px-4 w-full lg:w-[500px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all">
              Search
            </button>
          </div>

          {/* User Authentication */}
          <div className="flex items-center space-x-2 text-gray-800">
            <img
              src={"/Images/zzOthers/user-svgrepo-com.svg"}
              className="w-6 h-6"
              alt="User Icon"
            />
            <a href="signIn.html" className="hover:underline">
              Sign In
            </a>
          </div>
        </div>

        

        {/* Bottom Navigation Bar */}
        <div className="bg-white py-2 shadow-md flex justify-between items-center px-6 text-slate-900 text-md font-medium">
          {/* Categories */}
          <div className="flex items-center space-x-2">
            <img
              src=""
              className="w-6 h-6"
              alt="Categories"
            />
            <a href="#" className="hover:underline">All Categories</a>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-6">
            <a href="index.html" className="hover:underline">Home </a>
            <a href="aboutUs.html" className="hover:underline">About Us</a>
            <a href="#footer" className="hover:underline">Contact Us</a>
          </div>
        </div>

      </nav>
    </>
  );
};

export default UserNavBar;
