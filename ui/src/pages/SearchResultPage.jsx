import React, { useState } from "react";
import ProductCard from "../components/ProductCard"; 

const SearchResultPage = ({ results = [] }) => {
  const [searchResults, setSearchResults] = useState(results);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Search Results
        </h2>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                brand={product.brand}
                name={product.name}
                weight={product.weight}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products found. Try searching for something else.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
