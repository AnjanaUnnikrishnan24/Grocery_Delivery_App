import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../UI/src/components/Footer";
import AdminNavBar from "../UI/src/components/AdminNavBar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavBar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;




