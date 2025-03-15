import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import AdminNavBar from "../../components/AdminNavBar";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavBar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <main className="w-full max-w-md p-6">
          {/* Product & Category Management */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Product & Category Management</h2>
            <div className="space-y-4">
              <Link to="/addproduct">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded w-full">
                  Add New Product
                </button>
              </Link>
              <Link to="/productManage">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-full">
                  View Products
                </button>
              </Link>
            </div>
          </section>

          {/* Order & Customer Management */}
          <section className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Order & Customer Management</h2>
            <div className="space-y-4">
              <Link to="/orderManage">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-full">
                  View Orders
                </button>
              </Link>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
