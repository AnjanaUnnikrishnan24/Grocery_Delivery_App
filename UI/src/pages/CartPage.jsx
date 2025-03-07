import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
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

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

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
        <h2 className="text-2xl font-semibold text-center">Cart</h2>
        <table className="w-full border-collapse border border-gray-400 mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">MRP</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Actions</th>
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
                <td className="px-4 py-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">-</button>
                  <span className="px-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
                </td>
                <td className="px-4 py-2">₹{item.price * item.quantity}</td>
                <td className="px-4 py-2">
                  <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
