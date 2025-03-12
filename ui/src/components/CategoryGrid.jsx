// import React from "react";
// import CategoryCard from "./CategoryCard";

// const CategoryGrid = ({ categories }) => {
//   if (!categories || categories.length === 0) {
//     return <p className="text-center text-gray-500">No categories available</p>;
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//       {categories.map((category) => (
//         <CategoryCard key={category.id} category={category} />
//       ))}
//     </div>
//   );
// };

// export default CategoryGrid;



import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500 py-4 text-lg">No categories available</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id || category.name} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
