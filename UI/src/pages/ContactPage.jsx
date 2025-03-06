import React from "react";
import { Link } from "react-router-dom";
//import { whatsapp, facebook, instagram } from "../assets";
import whatsapp from '../assets/whatsapp.png'
const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        {/* Contact Heading */}
        <h1 className="text-2xl sm:text-2xl font-bold text-green-600 mb-4">Contact Us</h1>

        {/* Store Location */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Store Location</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          GroFresh Basket<br />XYZ Lane, Market Road
        </p>

        {/* Contact Numbers */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Contact Numbers</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          +959494949494<br />+944848484848
        </p>

        {/* Email */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Email Us</h2>
        <p className="text-gray-600 text-sm sm:text-base">grofreshbasket@gmail.com</p>

        {/* Social Media */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">Follow us on:</h2>
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-2">
          <img src={whatsapp} alt="WhatsApp" className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:opacity-80" />
          <img src={instagram} alt="Instagram" className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:opacity-80" />
          <img src={facebook} alt="Facebook" className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:opacity-80" />
        </div>

        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="mt-6 inline-block bg-green-500 text-white px-5 sm:px-6 py-2 rounded-md text-base sm:text-lg font-medium hover:bg-green-600 transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;

