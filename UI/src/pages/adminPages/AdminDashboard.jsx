import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats");
        const data = await res.json();
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-3">
            <li><a href="/admin/products" className="block hover:text-gray-400">Manage Products</a></li>
            <li><a href="/admin/orders" className="block hover:text-gray-400">Manage Orders</a></li>
            <li><a href="/admin/users" className="block hover:text-gray-400">Manage Users</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-4 shadow rounded-md">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-md">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-md">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-md">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mt-6 bg-white p-6 shadow rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <table className="table-auto w-full text-sm text-gray-600 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">No recent orders.</td>
                </tr>
              ) : (
                recentOrders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="border px-4 py-2">{order.orderId}</td>
                    <td className="border px-4 py-2">{order.customerName}</td>
                    <td className="border px-4 py-2 font-semibold text-green-600">₹{order.totalAmount}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
