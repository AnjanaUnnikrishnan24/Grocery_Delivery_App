import React, { useEffect, useState } from "react";

const OrderManage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Update the deliveryStatus field on the backend and update local state
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryStatus: newStatus }),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, deliveryStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Manage Orders</h1>

        {/* Orders Table */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <table className="table-auto w-full text-sm text-gray-600 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Total Amount (Rs)</th>
                <th className="border px-4 py-2">Delivery Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No orders available.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="border px-4 py-2">{order.orderId}</td>
                    <td className="border px-4 py-2">
                      {order.userId && order.userId.name
                        ? order.userId.name
                        : order.userId}
                    </td>
                    <td className="border px-4 py-2 font-semibold text-green-600">
                      ₹{order.totalAmt}
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border p-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManage;
