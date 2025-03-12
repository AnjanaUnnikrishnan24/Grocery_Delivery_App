import React, { useState, useEffect } from "react";

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/inventory");
        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }
        const data = await response.json();
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  // Handle search
  const filteredData = inventoryData.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Delete Product
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/deleteProduct/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setInventoryData(inventoryData.filter((item) => item.productId !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <main className="bg-white p-6 mt-2 shadow rounded-md ml-32 mr-2">
      <h2 className="text-lg font-semibold mb-4">Inventory</h2>

      {/* Search Input */}
      <div className="flex items-center space-x-2 mt-4 mb-4">
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-[600px] 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     focus:border-transparent"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Search
        </button>
      </div>

      {/* Inventory Table */}
      <table className="table-auto w-full text-sm text-gray-600 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Stock Quantity</th>
            <th className="border px-4 py-2">Price (Rs)</th>
            <th className="border px-4 py-2">Stock Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.productId} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{item.productId}</td>
              <td className="border px-4 py-2">{item.productName}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">{item.brand}</td>
              <td className="border px-4 py-2">{item.stockQty}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2 text-center">
                {item.stockQty > 0 ? (
                  <span className="text-green-600 font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </td>
              <td className="border px-4 py-2 text-center space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(item.productId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default InventoryTable;
