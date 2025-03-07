import React, { useState, useEffect } from "react";

const AddProduct = () => {
  const [productName, setProductName] = useState(""); 
  const [productId, setProductId] = useState("");  
  const [category, setCategory] = useState("");  
  const [subCategory, setSubCategory] = useState(""); 
  const [dietaryType, setDietaryType] = useState("Vegetarian"); 
  const [brand, setBrand] = useState("");  
  const [mrp, setMrp] = useState("");  
  const [discountPercent, setDiscountPercent] = useState(""); 
  const [weight, setWeight] = useState("");  
  const [stockQty, setStockQty] = useState(""); 
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for preview
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!category) return;
      try {
        const response = await fetch(`/api/subcategories?category=${category}`);
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubCategories();
  }, [category]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (isNaN(mrp) || isNaN(discountPercent) || isNaN(stockQty)) {
      alert("Please enter valid numerical values.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productId", productId);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("brand", brand);
      formData.append("dietaryType", dietaryType);
      formData.append("mrp", mrp);
      formData.append("discountPercent", discountPercent);
      formData.append("weight", weight);
      formData.append("stockQty", stockQty);

      if (productImage) {
        formData.append("productImage", productImage);
      }

      const response = await fetch("/api/addproducts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error adding product");
      }

      alert("Product added successfully!");
      setProductName("");
      setProductId("");
      setCategory("");
      setSubCategory("");
      setDietaryType("Vegetarian");
      setBrand("");
      setMrp("");
      setDiscountPercent("");
      setWeight("");
      setStockQty("");
      setProductImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <>
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
                value={productId}
                onChange={(e)=>setProductId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SubCategory Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Sub Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select SubCategory</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub.name}>
                    {sub.name}
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
                onChange={(e)=>setDietaryType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
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
                    {setProductImage(e.target.files[0])}
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
