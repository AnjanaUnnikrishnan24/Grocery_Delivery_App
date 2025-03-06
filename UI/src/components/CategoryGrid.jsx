import React from 'react'

import CategoryCard from "../components/CategoryCard";

const handleCategoryClick = (category) => {
  console.log("Selected Category:", category.name);
  // Implement navigation or filtering logic here
};

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          image={category.image}
          name={category.name}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;