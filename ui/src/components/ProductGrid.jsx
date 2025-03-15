import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (product) => {
    setLoading(true);
    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      console.log(`Added ${product.productName} to cart successfully!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
