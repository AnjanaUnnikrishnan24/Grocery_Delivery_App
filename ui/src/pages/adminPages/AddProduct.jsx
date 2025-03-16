import React, { useState } from "react";
import AdminNavBar from "../../components/AdminNavBar"

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [prodId, setProdId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [dietaryType, setDietaryType] = useState("Veg");
  const [brand, setBrand] = useState("");
  const [mrp, setMrp] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [weight, setWeight] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file); 
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !prodId || !categoryName || !brand || !mrp || !stockQty) {
      alert("Please fill in all required fields.");
      return;
    }

    

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("prodId", prodId);
      formData.append("categoryName", categoryName);
      formData.append("brand", brand);
      formData.append("dietaryType", dietaryType);
      formData.append("mrp", mrp);
      formData.append("discountPercent", discountPercent);
      formData.append("weight", weight);
      formData.append("stockQty", stockQty);

      if (productImage) {
        formData.append("productImage", productImage);
      }

      const response = await fetch("/api/addProducts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error adding product");
      }

      alert("Product added successfully!");

      setProductName("");
      setProdId("");
      setCategoryName("");
      setDietaryType("Veg");
      setBrand("");
      setMrp("");
      setDiscountPercent("");
      setWeight("");
      setStockQty("");
      setProductImage(null);
      document.getElementById("productImageInput").value = "";
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="bg-gray-200 font-sans">
      <AdminNavBar/>
      <main className="ml-72 p-8 bg-white shadow-lg rounded-lg w-[75%] mt-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Add a New Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product ID</label>
              <input
                type="text"
                value={prodId}
                onChange={(e) => setProdId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Category</label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Flour">Flour</option>
                <option value="Oils">Oils</option>
                <option value="Beverages">Beverages</option>
                <option value="Frozen Foods">Frozen Foods</option>
                <option value="Dairy Products">Dairy Products</option>
                <option value="Spices">Spices</option>
                <option value="Cereals">Cereals</option>
                <option value="Snacks">Snacks</option>
                <option value="Pulses">Pulses</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dietary Preference</label>
              <select
                value={dietaryType}
                onChange={(e) => setDietaryType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">MRP (Rs)</label>
              <input
                type="number" required
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
              <input
                type="number" required
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product weight</label>
              <input
                type="text" required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input
                type="number" required
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input
                id="productImageInput" required
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <button type="submit" className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium">
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
