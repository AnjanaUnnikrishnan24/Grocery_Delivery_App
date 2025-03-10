import React, { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import CategoryGrid from "../components/CategoryGrid";
import Footer from "../components/Footer";
import Banner1 from "../assets/images/Banner1.png";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <UserNavBar />
      <div>
        <div className="mt-4">
          <img src={Banner1} className="w-full" alt="Banner" loading="lazy" />
        </div>

        <div className="bg-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
              All Available Categories
            </h2>
            {loadingCategories ? (
              <p className="text-center text-lg">Loading categories...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : categories.length > 0 ? (
              <CategoryGrid categories={categories} />
            ) : (
              <p className="text-center text-gray-600">No categories available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
