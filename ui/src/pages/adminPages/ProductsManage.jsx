import React, { useEffect, useState } from "react";

const ProductsManage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updateData, setUpdateData] = useState({});

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

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/deleteProduct/${_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((product) => product._id !== _id));
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setUpdateData({ ...product });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/updateProduct/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error("Failed to update product");
      alert("Product updated successfully!");

      fetchProducts();
      setEditingProduct(null);
    } catch (err) {
      alert("Error updating product: " + err.message);
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
                    <td className="border px-4 py-2">{product.categoryName}</td>
                    <td className="border px-4 py-2">{product.brand}</td>
                    <td className="border px-4 py-2">₹{product.mrp}</td>
                    <td className="border px-4 py-2 font-semibold text-green-600">
                      ₹{product.discountedPrice}
                    </td>
                    <td className="border px-4 py-2">{product.stockQty}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => openEditModal(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(product._id)}
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

      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-grey-100 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={updateData.productName}
                onChange={handleUpdateChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Product Name"
              />
              <label>Product Category</label>
              <input
                type="text"
                name="categoryName"
                value={updateData.categoryName}
                onChange={handleUpdateChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Category"
              />
              <label>Product Brand</label>
              <input
                type="text"
                name="brand"
                value={updateData.brand}
                onChange={handleUpdateChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Brand"
              />
              <label>Product MRP</label>
              <input
                type="number"
                name="mrp"
                value={updateData.mrp}
                onChange={handleUpdateChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="MRP"
              />
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stockQty"
                value={updateData.stockQty}
                onChange={handleUpdateChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Stock Quantity"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManage;
