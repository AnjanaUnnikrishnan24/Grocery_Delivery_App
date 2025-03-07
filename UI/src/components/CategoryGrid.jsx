import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500">No categories available</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
