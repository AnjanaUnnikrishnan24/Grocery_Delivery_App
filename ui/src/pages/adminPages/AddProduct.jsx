import { useState } from "react";
import AdminDashboard from "./AdminDashboard";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [prodId, setProdId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [brand, setBrand] = useState("");
  const [dietaryType, setDietaryType] = useState("Veg");
  const [mrp, setMrp] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [weight, setWeight] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedMrp = parseFloat(mrp);
    const parsedDiscountPercent = parseFloat(discountPercent) || 0;
    const parsedStockQty = parseInt(stockQty, 10);

    if (!productName || !prodId || !categoryName || !brand || isNaN(parsedMrp) || isNaN(parsedStockQty)) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    if (parsedMrp <= 0 || parsedDiscountPercent < 0 || parsedStockQty < 0) {
      alert("Values must be positive numbers.");
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", productName);
    formData.append("ProdId", prodId);
    formData.append("CategoryName", categoryName);
    formData.append("Brand", brand);
    formData.append("DietaryType", dietaryType);
    formData.append("Mrp", parsedMrp);
    formData.append("DiscountPercent", parsedDiscountPercent);
    formData.append("Weight", weight);
    formData.append("StockQty", parsedStockQty);

    if (productImage) {
      formData.append("productImage", productImage);
    }

    try {
      const response = await fetch("/api/addProducts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      alert("Product added successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
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
    setPreviewImage(null);
  };


  return (
    <>
    <AdminDashboard />
   
    <div className="bg-gray-200 font-sans">
      <main className="ml-72 p-8 bg-white shadow-lg rounded-lg w-[75%] mt-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Add a New Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={productName}
                onChange={(e)=>setProductName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product ID
              </label>
              <input
                type="number"
                name="productId"
                value={prodId}
                onChange={(e)=>setProdId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Category
              </label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700">
                Dietary Preference
              </label>
              <select
                name="dietaryType"
                value={dietaryType}
                onChange={(e)=>setDietaryType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Brand
              </label>
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                MRP (Rs)
              </label>
              <input
                type="number"
                name="mrp"
                value={mrp}
                onChange={(e)=>setMrp(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountPercent"
                value={discountPercent}
                onChange={(e)=>setDiscountPercent(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Weight (g/kg/ml/l)
              </label>
              <input
                type="text"
                name="weight"
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQty"
                value={stockQty}
                onChange={(e)=>setStockQty(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e)=>{
                  if(e.target.files && e.target.files[0]){
                    setProductImage(e.target.files[0]);
                  }
                }}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium "
             >
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
    </>
  );
};

export default AddProduct;
