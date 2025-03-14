import React, { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";

const ProductListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

   useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url =
          category.toLowerCase() === "all"
            ? `/api/allproducts`
            : `/api/productsbycategory/${category}`;
        const response = await fetch(url, { credentials: "omit" });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", { credentials: "omit" });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const finalProducts =
    selectedCategory.toLowerCase() === "all"
      ? filteredProducts
      : filteredProducts.filter(
          (product) =>
            product.category &&
            product.category.catName &&
            product.category.catName.toLowerCase() === selectedCategory.toLowerCase()
        );

  const sortedProducts = [...finalProducts].sort((a, b) => {
    if (sortOption === "name")
      return a.productName.localeCompare(b.productName);
    if (sortOption === "priceAsc")
      return a.discountedPrice - b.discountedPrice;
    if (sortOption === "priceDesc")
      return b.discountedPrice - a.discountedPrice;
    return 0;
  });

  return (
    <main className="container mx-auto p-6">
      {/* Header, Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold capitalize">
          {selectedCategory.toLowerCase() === "all"
            ? "All Products"
            : `${selectedCategory} Products`}
        </h2>
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4 mb-4">
        {/* Sorting Dropdown */}
        <div className="flex flex-col">
          <label className="block text-xs font-medium mb-1">Sort By</label>
          <select
            className="border border-gray-300 rounded-md py-1 px-2 text-xs"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">None</option>
            <option value="name">Alphabetical (A-Z)</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
          </select>
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex flex-col">
          <label className="block text-xs font-medium mb-1">
            Filter by Category
          </label>
          <select
            className="border border-gray-300 rounded-md py-1 px-2 text-xs"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.catName}>
                {cat.catName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-600">Loading products...</p>
      )}
      {error && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}
      {!loading && !error && sortedProducts.length > 0 ? (
        <ProductGrid products={sortedProducts} />
      ) : (
        !loading && (
          <p className="text-center text-gray-500">No products found.</p>
        )
      )}
    </main>
  );
};

export default ProductListingPage;
