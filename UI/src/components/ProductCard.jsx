import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (!addedToCart) {
      onAddToCart(product); // Pass the product object
      setAddedToCart(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-72 transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Product Image */}
      <Link to={`/productDetailsPage/${product._id || product.id}`} aria-label={`View details for ${product.productName}`}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.productName ? `${product.productName} image` : "Product Image"}
          className="w-full h-48 object-cover rounded-md mb-4"
          loading="lazy"
        />
      </Link>

      {/* Product Name & Weight */}
      <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
      <p className="text-sm text-gray-600 font-bold">{product.weight}</p>

      {/* Pricing & Add to Cart */}
      <div className="mt-3 flex justify-between items-center">
        <div>
          {product.mrp && <p className="text-gray-500 line-through text-sm">₹{product.mrp}</p>}
          <p className="text-green-600 font-bold text-lg">₹{product.discountedPrice}</p>
        </div>

        <button
          className={`px-4 py-2 rounded-md transition duration-300 ${
            addedToCart ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
          } ${addedToCart ? "scale-95" : "scale-100"} transform`}
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
