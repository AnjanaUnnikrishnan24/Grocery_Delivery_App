import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/cart/viewCart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
         const items = data.cart.map((item) => ({
          id: item.productId._id,
          name: item.productId.productName,
          mrp: item.productId.mrp, 
          price: item.price,
          quantity: item.quantity,
          image: item.productId.productImage,
        }));
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, []);

  // Update quantity of a cart item
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;  

    try {
      const response = await fetch(`/cart/updateQty/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }
      const data = await response.json();
      const updatedItems = data.cart.map((item) => ({
        id: item.productId._id,
        name: item.productId.productName,
        mrp: item.productId.mrp,
        price: item.price,
        quantity: item.quantity,
        image: item.productId.productImage,
      }));
      setCartItems(updatedItems);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

 
  const removeItem = async (id) => {
    try {
      const response = await fetch(`/cart/removeproduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
           
        },
      });
      if (!response.ok) {
        throw new Error("Failed to remove cart item");
      }
      const data = await response.json();
      const updatedItems = data.cart.map((item) => ({
        id: item.productId._id,
        name: item.productId.productName,
        mrp: item.productId.mrp,
        price: item.price,
        quantity: item.quantity,
        image: item.productId.productImage,
      }));
      setCartItems(updatedItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = cartItems.reduce((acc, item) => acc + ((item.mrp - item.price) * item.quantity), 0);
  const shippingFee = subtotal > 1000 ? 0 : 50;
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

        {/* Order Summary */}
        <div className="mt-6 text-right">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Discount: ₹{discount}</p>
          <p>Shipping Fee: ₹{shippingFee}</p>
          <p>Convenience Fee: ₹{convenienceFee}</p>
          <p className="font-bold">Total: ₹{total}</p>
        </div>

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
