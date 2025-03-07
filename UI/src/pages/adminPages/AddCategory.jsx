import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CategoryCard from "../../components/CategoryCard";
import AdminNavBar from "../../components/AdminNavBar";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.image) {
      toast.error("Please enter both name and image URL.");
      return;
    }

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (res.ok) {
        const savedCategory = await res.json();
        setCategories([...categories, savedCategory]);
        setNewCategory({ name: "", image: "" });
        toast.success("Category added successfully!");
      } else {
        throw new Error("Failed to add category.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add a new subcategory
  const handleAddSubCategory = async () => {
    if (!selectedCategory || !newSubCategory) {
      toast.error("Please select a category and enter a subcategory name.");
      return;
    }

    try {
      const res = await fetch(`/api/categories/${selectedCategory}/subcategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSubCategory }),
      });

      if (res.ok) {
        const updatedCategory = await res.json();
        setCategories(
          categories.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat))
        );
        setNewSubCategory("");
        toast.success("Subcategory added successfully!");
      } else {
        throw new Error("Failed to add subcategory.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
    <AdminNavBar></AdminNavBar>
    <div className="p-16 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Categories</h2>

      {/* Add New Category Form */}
      <div className="bg-white shadow p-4 rounded-md mb-6 ml-64 mr-32">
        <h3 className="text-lg font-semibold mb-2">Add New Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCategory.image}
          onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>

      {/* Add New Subcategory */}
      <div className="bg-white shadow p-4 rounded-md mb-6 ml-64 mr-32">
        <h3 className="text-lg font-semibold mb-2">Add New Subcategory</h3>
        <select
          className="border p-2 rounded w-full mb-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subcategory Name"
          value={newSubCategory}
          onChange={(e) => setNewSubCategory(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddSubCategory}
        >
          Add Subcategory
        </button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white p-4 shadow rounded-md">
            <CategoryCard image={category.image} name={category.name} />
            <h4 className="font-semibold mt-2">Subcategories:</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              {category.subCategories.length > 0 ? (
                category.subCategories.map((sub, index) => <li key={index}>{sub.name}</li>)
              ) : (
                <li className="text-gray-400">No subcategories</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AddCategory;
