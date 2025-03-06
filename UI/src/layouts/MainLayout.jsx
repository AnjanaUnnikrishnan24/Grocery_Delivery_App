import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavBar from "../components/UserNavBar";
import Footer from "../components/Footer"

const MainLayout = () => {
  return (
    <>
      <UserNavBar />
      <Outlet />
      <ToastContainer />
      <Footer/>
    </>
  );
};

export default MainLayout;