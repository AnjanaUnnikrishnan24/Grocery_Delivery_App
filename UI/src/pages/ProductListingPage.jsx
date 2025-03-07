import React, { useState, useEffect } from "react";

const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [subcategories, setSubcategories] = useState(["All"]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);

        // Extract unique categories dynamically
        const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    if (category === "All") {
      setSubcategories(["All"]);
    } else {
      const filteredSubcategories = [
        "All",
        ...new Set(products.filter((p) => p.category === category).map((p) => p.subcategory)),
      ];
      setSubcategories(filteredSubcategories);
    }
    setSubcategory("All"); // Reset subcategory when category changes
  }, [category, products]);

  // Filter products based on search, category & subcategory
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || product.category === category) &&
      (subcategory === "All" || product.subcategory === subcategory)
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    return 0;
  });

  return (
    <main className="container mx-auto p-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category, Subcategory & Sorting Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {/* Category Filter */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <label className="block font-medium mb-1">Subcategory</label>
          <select
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={subcategories.length === 1} // Disable if no subcategories
          >
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label className="block font-medium mb-1">Sort By</label>
          <select
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">None</option>
            <option value="name">Alphabetical (A-Z)</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Display loading or error messages */}
      {loading && <p className="text-center text-gray-600">Loading products...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg transition hover:shadow-xl">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.brand || "No brand"}</p>
              <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500 col-span-3">No products found.</p>
        )}
      </div>
    </main>
  );
};

export default ProductListingPage;
