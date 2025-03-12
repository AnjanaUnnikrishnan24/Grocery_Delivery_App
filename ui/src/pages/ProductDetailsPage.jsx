import React, { useState } from "react";

const ProductDetailsPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="text-center text-gray-500">Product details not available.</p>;
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  return (
    <div className="bg-gray-200 font-sans min-h-screen">
      <div className="container mx-auto my-8 px-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          <div>
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>


          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.productName}
            </h2>
            <hr className="my-4" />

            <div className="text-gray-700">
              <p className="text-xl font-bold mb-2">
                ₹{product.discountedPrice}
              </p>
              {product.mrp && (
                <p className="line-through text-gray-500 mb-4">
                  MRP: ₹{product.mrp}
                </p>
              )}

              <label
                htmlFor="quantity"
                className="block text-gray-600 font-medium mb-2"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-20 mb-4"
              />

              <div className="flex gap-4">
                <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 w-full">
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-300 w-full">
                  Add to Wishlist
                </button>
              </div>
            </div>

            <hr className="my-4" />

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Product Details
            </h3>
            <table className="table-auto w-full text-gray-700 mb-6 border-collapse border border-gray-300">
              <tbody>
                {[
                  [
                    "Category",
                    product.categoryName
                      ? product.categoryName.catName
                      : product.category,
                  ],
                  ["Brand", product.brand],
                  ["Weight", product.weight],
                  ["Dietary Type", product.dietaryType],
                ].map(([label, value], index) =>
                  value ? (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="px-4 py-2 font-medium">{label}</td>
                      <td className="px-4 py-2">{value}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
