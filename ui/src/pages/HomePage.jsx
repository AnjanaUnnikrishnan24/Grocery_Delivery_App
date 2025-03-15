import React from "react";
import UserNavBar from "../components/UserNavBar";
import Footer from "../components/Footer";
import Banner1 from "../assets/images/Banner1.png";

const HomePage = () => {

  return (
    <>
      <UserNavBar />
      <div>
        <div className="mt-4">
          <img src={Banner1} className="w-full h-[85vh]" alt="Banner"  />
        </div>        
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
