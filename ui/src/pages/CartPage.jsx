import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Please log in to view your cart.");
      setTimeout(() => navigate("/SignIn"), 2000);
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "GET",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCartItems(data.shoppingCart || []);
    } catch (error) {
      setErrorMsg(error.message || "Error fetching cart data");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (prodId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/remove/${prodId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to remove item");
      setCartItems(cartItems.filter((item) => item.prodId?._id !== prodId));
    } catch (error) {
      setErrorMsg(error.message || "Error removing item from cart");
    }
  };

  // Calculate total amount safely
  const totalAmount = cartItems.reduce((acc, { prodId, quantity }) => {
    if (!prodId || !prodId.discountedPrice) return acc; // Skip invalid items
    return acc + prodId.discountedPrice * quantity;
  }, 0);

  if (loading) return <p className="text-center text-gray-600">Loading cart...</p>;
  if (errorMsg) return <p className="text-center text-red-500">{errorMsg}</p>;
  if (cartItems.length === 0) return <p className="text-center text-gray-500">Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.map(({ prodId, quantity }) => {
        if (!prodId) return null; // Skip rendering invalid items
        return (
          <div key={prodId._id} className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img
                src={prodId.productImage || "https://via.placeholder.com/150"}
                alt={prodId.productName}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">Product Name: {prodId.productName}</h3>
                <p className="text-gray-600">Price: ₹{prodId.discountedPrice}</p>
                <p className="text-gray-600">Quantity: {quantity}</p>
              </div>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => handleRemove(prodId._id)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <div className="mt-4 text-right">
        <h3 className="text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</h3>
      </div>
      <Link to="/checkout">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-full">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartPage;