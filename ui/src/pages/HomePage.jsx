import React, { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import Footer from "../components/Footer";
import Banner1 from "../assets/images/Banner1.png";
import About from "../components/About";

const HomePage = () => {

  return (
    <>
      <UserNavBar />
      <div>
        <div className="mt-4">
          <img src={Banner1} className="w-full" alt="Banner" loading="lazy" />
        </div>
        <About />
        
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
