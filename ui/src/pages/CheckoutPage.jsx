import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const [newAddress, setNewAddress] = useState({ address_line: "", city: "", state: "", pincode: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/SignIn");
    try {
      const response = await fetch("/api/cart", { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCartItems(data.shoppingCart || []);
    } catch (err) {
      setError("Error fetching cart: " + err.message);
    }
  };

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/user/addresses", { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Failed to fetch addresses");
      const data = await response.json();
      setAddresses(data.addresses || []);
    } catch (err) {
      setError("Error fetching addresses: " + err.message);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.address_line || !newAddress.city || !newAddress.state || !/\d{6}/.test(newAddress.pincode)) {
      setError("Please enter a valid address");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newAddress),
      });
      if (!response.ok) throw new Error("Failed to add address");
      const data = await response.json();
      setAddresses([...addresses, data]); // Add the new address to the list
      setNewAddress({ address_line: "", city: "", state: "", pincode: "" }); // Reset the form
    } catch (err) {
      setError("Error adding address: " + err.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError("Please select an address.");
      return;
    }

    const addressDetails = addresses.find((addr) => addr._id === selectedAddress);
    if (!addressDetails) {
      setError("Invalid address.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ addressId: selectedAddress, paymentMethod: selectedPayment }),
      });
      if (!response.ok) throw new Error("Failed to place order");
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError("Error placing order: " + err.message);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Order Summary */}
      <div className="bg-white p-4 shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {cartItems.map(({ prodId, quantity }) => {
          if (!prodId) return null; // Skip invalid items
          return (
            <div key={prodId._id} className="flex justify-between border-b py-2">
              <span>{prodId.productName} (x{quantity})</span>
              <span>₹{(prodId.discountedPrice * quantity).toFixed(2)}</span>
            </div>
          );
        })}
        <div className="mt-4 text-right">
          <h3 className="text-xl font-bold">Total: ₹{cartItems.reduce((acc, { prodId, quantity }) => acc + (prodId?.discountedPrice || 0) * quantity, 0).toFixed(2)}</h3>
        </div>
      </div>

      {/* Address Selection */}
      <div className="bg-white p-4 shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Address</h3>
        {addresses.map((addr) => (
          <label key={addr._id} className="block mb-2">
            <input
              type="radio"
              name="address"
              value={addr._id}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="mr-2"
            />
            {addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}
          </label>
        ))}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Add New Address</h3>
          <input
            type="text"
            placeholder="Address Line"
            className="border p-2 w-full mb-2"
            value={newAddress.address_line}
            onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            className="border p-2 w-full mb-2"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            className="border p-2 w-full mb-2"
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="border p-2 w-full mb-2"
            value={newAddress.pincode}
            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
          />
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Address
          </button>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white p-4 shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        <select
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
        </select>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-full"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;