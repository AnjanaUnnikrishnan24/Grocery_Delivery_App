import React from 'react';

const MainFooter = () => {
  return (
    <>
    <footer id="footer" className="w-full bg-green-700 text-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <h3 className="text-lg font-semibold">Store Location</h3>
          <p className="mt-2">GroFresh Basket<br/>XYZ Lane<br/>Market Road</p>
          <p className="mt-4">Follow us on:</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="mt-2">+959494949494</p>
          <p>+944848484848</p>
          <h3 className="mt-4 text-lg font-semibold">Email Us</h3>
          <p className="mt-2">grofreshbasket.in</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Information</h3>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Deals & Offers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Subscribe to get updates</h3>
          <div className="mt-2 flex space-x-2">
            <input id="email-address" name="email" type="email" autoComplete="email" required className="flex-1 rounded-md bg-white px-4 py-2 text-gray-800 sm:text-sm" placeholder="Enter your email"/>
            <button type="submit" className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <hr className="border-gray-600" />
        <p className="mt-4">&copy; Copyright 2025. All Rights Reserved.</p>
      </div>
    </footer>
    </>
    
  );
}

export default MainFooter;