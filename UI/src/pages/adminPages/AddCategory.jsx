import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
 
function AddCategory() {
  const navigate = useNavigate();
 
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);

   const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFileChange = (e) => {
    setNewCategoryImage(e.target.files[0]);
  };

  async function handleAddCategory() {
    if (!newCategoryName.trim() || !newCategoryImage) {
      alert("Category name and image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategoryName);
    formData.append("image", newCategoryImage);

    setLoading(true);
    try {
      const response = await fetch("/api/addCategory", {
        method: "POST",
        credentials:"include",
        body: formData,
      });

      const result = await response.json(); 

      if (!response.ok) {
        console.error("Server Response:", result); 
        throw new Error(result.message || "Error adding product");
      }

      if (response.ok) {
        alert(result.message || "Category added successfully!");
        setNewCategoryName("");
        setNewCategoryImage(null);
        document.getElementById("category-image-input").value = "";
        fetchCategories();
      } else {
        alert(result.message || "Error adding category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    } finally {
      setLoading(false);
    }
  }

  if (profileLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-16 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Manage Categories
      </h2>

      <div className="bg-white shadow p-4 rounded-md mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Add New Category
        </h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          id="category-image-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          onClick={handleAddCategory}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  const imageSrc = category.catImage
    ? `data:image/*;base64,${category.catImage}`
    : "";

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <img
        src={imageSrc}
        alt={category.catName}
        className="w-full h-[400px] object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">
        {category.catName}
      </h3>
    </div>
  );
}

export default AddCategory;
