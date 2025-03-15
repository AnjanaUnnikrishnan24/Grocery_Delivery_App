
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { prodId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: "",
    categoryName: "",
    brand: "",
    dietaryType: "Veg",
    mrp: "",
    discountPercent: "",
    weight: "",
    stockQty: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${prodId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();

        setProductData({
          productName: data.productName,
          categoryName: data.categoryName,
          brand: data.brand,
          dietaryType: data.dietaryType,
          mrp: data.mrp,
          discountPercent: data.discountPercent,
          weight: data.weight,
          stockQty: data.stockQty,
        });

        if (data.productImage) {
          setPreviewImage(data.productImage);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [prodId]);

  // Handle input changes
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("categoryName", productData.categoryName);
    formData.append("brand", productData.brand);
    formData.append("dietaryType", productData.dietaryType);
    formData.append("mrp", productData.mrp);
    formData.append("discountPercent", productData.discountPercent);
    formData.append("weight", productData.weight);
    formData.append("stockQty", productData.stockQty);

    if (selectedFile) {
      formData.append("productImage", selectedFile);
    }

    try {
      const response = await fetch(`/api/productupdate/${prodId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      alert("Product updated successfully!");
      navigate("/inventory");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 font-sans">
      <main  className="ml-72 p-8 bg-white shadow-lg rounded-lg w-[75%] mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Update Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div  className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name:</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="text" name="productName" value={productData.productName} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="text" name="categoryName" value={productData.categoryName} onChange={handleChange} required />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand:</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="text" name="brand" value={productData.brand} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Type:</label>
            <select name="dietaryType" value={productData.dietaryType} onChange={handleChange}>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">MRP:</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="number" name="mrp" value={productData.mrp} onChange={handleChange} required />
          </div>
          <div>

            <label className="block text-sm font-medium text-gray-700">Discount (%):</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="number" name="discountPercent" value={productData.discountPercent} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight:</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="text" name="weight" value={productData.weight} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Quantity:</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="number" name="stockQty" value={productData.stockQty} onChange={handleChange} required />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">Product Image:</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" onChange={handleFileChange} />
            {previewImage && <img src={previewImage} alt="Product Preview" style={{ width: "150px", marginTop: "10px" }} />}
          </div>

        
        </div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Product"}</button>
      </form>
      </main>
    </div>
  );
};

export default UpdateProduct;
