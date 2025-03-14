import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsManage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); 
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
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

  const handleDelete = async (prodId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(prodId); 

    try {
      const res = await fetch(`/api/deleteProduct/${prodId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete product");

      alert("Product deleted successfully!");
      setProducts((prev) => prev.filter((product) => product.prodId !== prodId));
    } catch (err) {
      alert("Error deleting product: " + err.message);
    } finally {
      setDeletingId(null); // Reset deleting state
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
                  <tr key={product.prodId} className="border-b">
                    <td className="border px-4 py-2">{product.prodId}</td>
                    <td className="border px-4 py-2">{product.productName}</td>
                    <td className="border px-4 py-2">{product.categoryName}</td>
                    <td className="border px-4 py-2">{product.brand}</td>
                    <td className="border px-4 py-2">₹{product.mrp}</td>
                    <td className="border px-4 py-2 font-semibold text-green-600">
                      ₹{product.discountedPrice}
                    </td>
                    <td className="border px-4 py-2">{product.stockQty}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                    <Link to ={`/productupdate/${product.prodId}`}>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                        Edit</button>
                      </Link>
                      <button
                        className={`bg-red-500 text-white px-3 py-1 rounded-md ${
                          deletingId === product._id ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                        }`}
                        onClick={() => handleDelete(product.prodId)}
                        disabled={deletingId === product.prodId}
                      >
                        {deletingId === product._id ? "Deleting..." : "Delete"}
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
