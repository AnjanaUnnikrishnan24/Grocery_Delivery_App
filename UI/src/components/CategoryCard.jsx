import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const showProducts = () => {
    navigate(`/products?category=${category.name}`);
  };

  return (
    <div
      className="flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg p-4 transition cursor-pointer"
      onClick={showProducts}
    >
      <img
        src={category.image}
        className="w-32 h-32 object-cover rounded-md mb-4"
        alt={category.name}
        loading="lazy"
      />
      <h4 className="text-lg font-semibold text-gray-700">{category.name}</h4>
    </div>
  );
};

export default CategoryCard;
