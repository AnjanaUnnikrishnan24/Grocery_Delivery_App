import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems] = useState([
    {
      id: 1,
      name: "Ghee",
      image: "https://via.placeholder.com/50",
      price: 450,
      quantity: 2,
    },
    {
      id: 2,
      name: "Rice",
      image: "https://via.placeholder.com/50",
      price: 650,
      quantity: 1,
    },
  ]);

  const [addresses, setAddresses] = useState([
    "123 Main St, City, State, 12345",
    "456 Another Rd, City, State, 67890",
  ]);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [newAddress, setNewAddress] = useState("");
  const [showNewAddressInput, setShowNewAddressInput] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 1000 ? 0 : 50;
  const convenienceFee = 20;
  const total = subtotal + shippingFee + convenienceFee;

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress);
      setNewAddress("");
      setShowNewAddressInput(false);
    }
  };

  return (
    <main className="container mx-auto p-6 space-y-8 mt-10">
      <h2 className="text-2xl font-semibold text-center">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Details */}
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Cart Details</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2 flex items-center space-x-4">
                    <img src={item.image} className="w-12 h-12 object-cover rounded-md" alt={item.name} />
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">₹{item.price}</td>
                  <td className="px-4 py-2 text-right">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Shipping Fee</span>
            <span>₹{shippingFee}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Convenience Fee</span>
            <span>₹{convenienceFee}</span>
          </div>
          <div className="flex justify-between font-semibold py-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Address Selection */}
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Select Address</h3>
        <select 
          className="w-full p-2 border rounded mb-4" 
          value={selectedAddress} 
          onChange={(e) => setSelectedAddress(e.target.value)}
        >
          {addresses.map((address, index) => (
            <option key={index} value={address}>{address}</option>
          ))}
        </select>
        
        {showNewAddressInput ? (
          <div className="mt-4">
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              placeholder="Enter new address" 
              value={newAddress} 
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <button 
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={handleAddAddress}
            >
              Add Address
            </button>
          </div>
        ) : (
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setShowNewAddressInput(true)}
          >
            Add New Address
          </button>
        )}
      </div>

      {/* Proceed to Payment Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => navigate("/payment")}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Proceed to Payment
        </button>
      </div>
    </main>
  );
};

export default CheckoutPage;