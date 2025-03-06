import React, { useState, useEffect } from "react";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalMRP: 0,
    totalDiscount: 0,
    shippingFee: 50,
    convenienceFee: 20,
    finalTotal: 0,
  });

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders"); // Update API URL
        const data = await response.json();
        setOrders(data);

        // Calculate summary
        let totalMRP = 0;
        let totalDiscount = 0;
        let finalTotal = 0;

        data.forEach((order) => {
          totalMRP += order.originalPrice;
          totalDiscount += order.originalPrice - order.totalAmount;
          finalTotal += order.totalAmount;
        });

        setSummary((prev) => ({
          ...prev,
          totalMRP,
          totalDiscount,
          finalTotal: finalTotal + prev.shippingFee + prev.convenienceFee,
        }));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-6">
      <main className="max-w-4xl mx-auto">
        {/* Orders Table */}
        <section className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found.</p>
          ) : (
            <table className="table-auto w-full text-sm text-gray-600 border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">Date Ordered</th>
                  <th className="border px-4 py-2">Items</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Delivery Date</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="border px-4 py-2">{order.orderId}</td>
                    <td className="border px-4 py-2">{order.dateOrdered}</td>
                    <td className="border px-4 py-2">{order.noOfItems}</td>
                    <td className="border px-4 py-2 font-semibold text-green-600">₹{order.totalAmount}</td>
                    <td className="border px-4 py-2">{order.deliveryDate}</td>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        order.status === "Delivered" ? "text-green-500" : "text-orange-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => alert(`Viewing order: ${order.orderId}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Order Summary */}
        <div className="bg-white p-6 mt-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">MRP</td>
                <td className="px-4 py-2">₹{summary.totalMRP}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Discount</td>
                <td className="px-4 py-2">- ₹{summary.totalDiscount}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Shipping Fee</td>
                <td className="px-4 py-2">₹{summary.shippingFee}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Convenience Fee</td>
                <td className="px-4 py-2">₹{summary.convenienceFee}</td>
              </tr>
              <tr className="font-semibold bg-gray-200">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2">₹{summary.finalTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserOrders;
