import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/viewCart", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Debugging: Log raw response
        const text = await response.text();
        console.log("Raw response:", text);

        if (!response.ok) {
          throw new Error(`Failed to fetch cart (HTTP ${response.status})`);
        }

        // Parse JSON
        const data = JSON.parse(text);
        const items = data.cart.map((item) => ({
          id: item.prodId._id,
          name: item.prodId.productName,
          brand: item.prodId.brand,
          price: item.prodId.discountedPrice,
          quantity: item.quantity,
          image: item.prodId.productImage,
        }));

        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to fetch cart. Please try again.");
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(`/api/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`/api/remove/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove cart item");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch("/api/clearCart", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <main className="container mx-auto p-6 space-y-8 mt-10">
      <div className="bg-white w-[90%] mt-16 p-6 rounded-md mx-auto shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Cart</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {cartItems.length > 0 ? (
          <>
            <table className="w-full border-collapse border border-gray-400 mt-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Brand</th>
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
                      <img
                        src={item.image}
                        className="w-12 h-12 object-cover rounded-md"
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="px-4 py-2">{item.brand}</td>
                    <td className="px-4 py-2">₹{item.price}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-4 py-2">₹{item.price * item.quantity}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
        )}
      </div>
    </main>
  );
};

export default CartPage;
