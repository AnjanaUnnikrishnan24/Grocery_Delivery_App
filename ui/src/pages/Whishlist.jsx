import React from "react";

const Wishlist = () => {
  
  return (
    <main className="mt-10 mx-10 mb-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};