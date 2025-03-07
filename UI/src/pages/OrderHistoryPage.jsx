import React from 'react'

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalMRP: 0, 
    totalDiscount: 0,
    shippingFee: 50,
    convenienceFee: 20,
    finalTotal: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");

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
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch full order details on demand
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      if (!response.ok) throw new Error("Failed to fetch order details");

      const data = await response.json();
      setSelectedOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      alert("Failed to load order details.");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen font-sans p-6">
      <main className="max-w-4xl mx-auto">
        {/* Orders Table */}
        <section className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading orders...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : orders.length === 0 ? (
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
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="border px-4 py-2">{order.orderId}</td>
                    <td className="border px-4 py-2">{new Date(order.dateOrdered).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{order.noOfItems}</td>
                    <td className="border px-4 py-2 font-semibold text-green-600">₹{order.totalAmount}</td>
                    <td className="border px-4 py-2">{new Date(order.deliveryDate).toLocaleDateString()}</td>
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
                        onClick={() => fetchOrderDetails(order.orderId)}
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

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Date Ordered:</strong> {new Date(selectedOrder.dateOrdered).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <h3 className="font-semibold mt-4">Items:</h3>
              <ul className="list-disc list-inside">
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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


export default OrderHistoryPage