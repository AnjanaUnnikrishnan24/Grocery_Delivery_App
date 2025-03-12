import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = ({ product }) => {
    const [productName, setProductName] = useState(product.productName);
    const [categoryName, setCategoryName] = useState(product.categoryName);
    const [brand, setBrand] = useState(product.brand);
    const [dietaryType, setDietaryType] = useState(product.dietaryType);
    const [mrp, setMrp] = useState(product.mrp);
    const [discountPercent, setDiscountPercent] = useState(product.discountPercent);
    const [weight, setWeight] = useState(product.weight);
    const [stockQty, setStockQty] = useState(product.stockQty);
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("categoryName", categoryName);
            formData.append("brand", brand);
            formData.append("dietaryType", dietaryType);
            formData.append("mrp", mrp);
            formData.append("discountPercent", discountPercent);
            formData.append("weight", weight);
            formData.append("stockQty", stockQty);
            if (productImage) formData.append("productImage", productImage);

            const res = await fetch(`/api/updateProduct/${product._id}`, {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update product");

            toast.success("Product updated successfully!");
            navigate("/home");

        } catch (err) {
            console.error("Update error:", err);
            toast.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
      <div className="p-4">Loading Product data...</div>
    ) : error ? (
      <div className="p-4 text-red-500">{error}</div>
    ) : (
      <div className="bg-gray-200 font-sans">
        <main className="ml-72 p-8 bg-white shadow-lg rounded-lg w-[75%] mt-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Update Product
          </h2>
  
          <form onSubmit={submitForm}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.catname}
                    </option>
                  ))}
                </select>
              </div>
  
              
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dietary Preference
                </label>
                <select
                  name="dietaryType"
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
                <label className="block text-sm font-medium text-gray-700">
                  Product Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
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
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
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
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
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
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
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
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
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
                  onChange={(e) => setProductImage(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
  
            <div className="flex gap-4 mt-6 justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium"
              >
                Update Product
              </button>
            </div>
          </form>
        </main>
      </div>
    );
};

export default UpdateProduct;
