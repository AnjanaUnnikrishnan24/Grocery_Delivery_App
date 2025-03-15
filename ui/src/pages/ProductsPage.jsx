import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("none");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dietaryTypes, setDietaryTypes] = useState([]);
  const [selectedDietaryType, setSelectedDietaryType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/allproducts");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setCategories([...new Set(data.map((product) => product.categoryName))]);
        setDietaryTypes([...new Set(data.map((product) => product.dietaryType))]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];
    switch (option) {
      case "priceLowHigh":
        sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "priceHighLow":
        sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "nameAZ":
        sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "nameZA":
        sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter((product) =>
    (selectedCategory ? product.categoryName === selectedCategory : true) &&
    (selectedDietaryType ? product.dietaryType === selectedDietaryType : true) &&
    (searchQuery ? product.productName.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <div className=" bg-gray-100 mx-auto px-4 py-6">
      {/* Dynamic Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {selectedCategory ? `Products in ${selectedCategory}` : "All Products"}
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          className="border p-2 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-between mb-4">
        {/* Category Filter */}
        <select
          className="border p-2 rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Dietary Type Filter */}
        <select
          className="border p-2 rounded-lg"
          value={selectedDietaryType}
          onChange={(e) => setSelectedDietaryType(e.target.value)}
        >
          <option value="">All Dietary Types</option>
          {dietaryTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Sorting Options */}
        <select
          className="border p-2 rounded-lg"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAZ">Name: A to Z</option>
          <option value="nameZA">Name: Z to A</option>
        </select>
      </div>

      {/* Display Products */}
      {loading ? (
        <p className="text-center text-lg">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductsPage;
