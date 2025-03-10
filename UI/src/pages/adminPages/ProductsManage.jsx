import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsManage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/allproducts");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch("/api/deleteProduct", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((product) => product.productId !== id));
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

        {/* Products Table */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <table className="table-auto w-full text-sm text-gray-600 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Product ID</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">MRP (Rs)</th>
                <th className="border px-4 py-2">Discounted Price (Rs)</th>
                <th className="border px-4 py-2">Stock Qty</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No products available.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="border px-4 py-2">{product._id}</td>
                    <td className="border px-4 py-2">{product.productName}</td>
                    <td className="border px-4 py-2">
                      {product.category?.catName || product.categoryName}
                    </td>
                    <td className="border px-4 py-2">{product.brand}</td>
                    <td className="border px-4 py-2">₹{product.mrp}</td>
                    <td className="border px-4 py-2 font-semibold text-green-600">
                      ₹{product.discountedPrice}
                    </td>
                    <td className="border px-4 py-2">{product.stockQty}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <Link to={`/updateProduct/${product._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(product.productId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsManage;
