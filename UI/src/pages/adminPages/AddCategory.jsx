import React, { useState } from "react";
import CategoryCard from "./CategoryCard";

const AddCategory = () => {

  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.image) {
      alert("Please enter both name and image URL.");
      return;
    }

    setCategories([...categories, { id: categories.length + 1, ...newCategory }]);
    setNewCategory({ name: "", image: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

      {/* Add New Category Form */}
      <div className="bg-white shadow p-4 rounded-md mb-6">
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

      {/* Category List */}
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} image={category.image} name={category.name} />
        ))}
      </div>
    </div>
  );
};

export default AddCategory;