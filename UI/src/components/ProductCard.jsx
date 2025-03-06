import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-72 transition transform hover:scale-105 hover:shadow-2xl">
      <Link to={`/productDetailsPage/${product.id}`} aria-label={`View details for ${product.productName}`}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.productName || "Product Image"}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      </Link>
      <p className="text-sm text-gray-500">{product.brand}</p>
      <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
      <hr className="my-2" />
      <p className="text-sm text-gray-600 font-bold">{product.weight}</p>
      
      <div className="mt-3 flex justify-between items-center">
        <div>
          {product.mrp && <p className="text-gray-500 line-through text-sm">₹{product.mrp}</p>}
          <p className="text-green-600 font-bold text-lg">₹{product.discountedPrice}</p>
        </div>

        <button
          className={`px-4 py-2 rounded-md transition duration-300 flex items-center gap-2 ${
            addedToCart ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={handleAddToCart}
          disabled={addedToCart}
          aria-label={addedToCart ? "Added to cart" : "Add to cart"}
        >
          {addedToCart ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
