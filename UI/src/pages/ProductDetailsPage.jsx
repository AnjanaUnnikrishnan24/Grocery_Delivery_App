import React, { useState } from 'react';

const ProductDetailsPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  

  return (
    <div className="bg-gray-200 font-sans min-h-screen">
      <div className="container mx-auto my-8 px-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          {/* Product Image */}
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
          </div>
          
          {/* Product Details */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h2>
            <hr className="my-4" />
            
            <div className="text-gray-700">
              <p className="text-xl font-bold mb-2">${product.price}</p>
              {product.mrp && <p className="line-through text-gray-500 mb-4">MRP: ${product.mrp}</p>}

              <label htmlFor="quantity" className="block text-gray-600 font-medium mb-2">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
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
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Product Details</h3>
            <table className="table-auto w-full text-gray-700 mb-6 border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-2 font-medium">Category</td>
                  <td className="px-4 py-2">{product.category}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-2 font-medium">Sub Category</td>
                  <td className="px-4 py-2">{product.subCategory}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-2 font-medium">Brand</td>
                  <td className="px-4 py-2">{product.brand}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-2 font-medium">Product Type</td>
                  <td className="px-4 py-2">{product.type}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Description</td>
                  <td className="px-4 py-2">{product.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;