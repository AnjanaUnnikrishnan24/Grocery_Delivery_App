import React, { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import Banner1 from "../assets/images/Banner1.png";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch("/api/categories");
        const productResponse = await fetch("/api/products");

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoryData = await categoryResponse.json();
        const productData = await productResponse.json();

        setCategories(categoryData);
        setProducts(productData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <UserNavBar />
      <div>
        {/* Banner Section */}
        <div className="mt-32">
          <img src={Banner1} className="w-full" alt="Banner" loading="lazy" />
        </div>

        {/* Popular Categories */}
        <div className="bg-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Popular Categories</h2>
            <CategoryGrid categories={categories} />
          </div>
        </div>

        {/* Trending Products */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Trending Products</h2>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
