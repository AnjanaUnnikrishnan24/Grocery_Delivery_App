import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import AdminNavBar from "../../components/AdminNavBar";

const AdminDashboard = () => {

  return (
    <>
    <AdminNavBar/>
    <div className="flex flex-grow justify-center items-center h-100vh">
        <main className="w-full max-w-2xl p-6 h-[790px]">
            <section className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
                <h2 className="text-lg font-semibold mb-4">Product & Category Management</h2>
                <div className="space-y-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full">
                        <Link to="/addCategory" className="hover:text-green-600 transition">
                            Add New Category
                        </Link>
                    </button>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded w-full">
                        <Link to="/addproduct" className="hover:text-green-600 transition">
                            Add New Product
                        </Link>
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-full">
                        <Link to="/productManage" className="hover:text-green-600 transition">
                            View Products
                        </Link></button>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-semibold mb-4">Order & Customer Management</h2>
                <div className="space-y-4">
                    
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-full">
                        <Link to="/orderManage" className="hover:text-green-600 transition">
                            View Orders
                        </Link>
                    </button>
                </div>
            </section>
        </main>
    </div>
    <Footer/>
    </>
  );
};

export default AdminDashboard;
