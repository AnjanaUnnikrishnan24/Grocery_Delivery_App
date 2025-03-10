import React from "react";

const CategoryCard = ({ category }) => {

  const imageSrc = category.catImage
    ? `data:image/png;base64,${category.catImage}`
    : "https://via.placeholder.com/400";

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <img
        src={imageSrc}
        alt={category.catName}
        className="w-full h-[400px] object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{category.catName}</h3>
    </div>
  );
};

export default CategoryCard;
