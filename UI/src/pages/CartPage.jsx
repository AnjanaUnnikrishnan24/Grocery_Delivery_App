import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ghee",
      image: "https://via.placeholder.com/50",
      mrp: 500,
      price: 450,
      quantity: 2,
    },
    {
      id: 2,
      name: "Rice",
      image: "https://via.placeholder.com/50",
      mrp: 700,
      price: 650,
      quantity: 1,
    },
  ]);

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = cartItems.reduce((acc, item) => acc + (item.mrp - item.price) * item.quantity, 0);
  const shippingFee = subtotal > 1000 ? 0 : 50; // Free shipping for orders over 1000
  const convenienceFee = 20;
  const total = subtotal + shippingFee + convenienceFee;

  return (
    <main className="container mx-auto p-6 space-y-8 mt-10">
      {/* Cart Table */}
      <div className="bg-white w-[90%] mt-16 p-6 rounded-md mx-auto shadow-lg">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <table className="w-full border-collapse border border-gray-400 mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">MRP</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2 flex items-center space-x-4">
                  <img src={item.image} className="w-12 h-12 object-cover rounded-md" alt={item.name} />
                  <span>{item.name}</span>
                </td>
                <td className="px-4 py-2">₹{item.mrp}</td>
                <td className="px-4 py-2">₹{item.price}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="bg-white w-[90%] mt-4 p-6 mx-auto rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Subtotal</td>
              <td className="px-4 py-2">₹{subtotal}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Discount</td>
              <td className="px-4 py-2 text-green-600">- ₹{discount}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Shipping Fee</td>
              <td className="px-4 py-2">{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Convenience Fee</td>
              <td className="px-4 py-2">₹{convenienceFee}</td>
            </tr>
            <tr className="font-semibold bg-gray-200">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2">₹{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default CartPage;
