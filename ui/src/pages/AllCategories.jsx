import React, { useState, useEffect } from "react";
import CategoryGrid from "../components/CategoryGrid";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="p-6">Loading categories...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">
        Error fetching categories: {error}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <CategoryGrid categories={categories} />
    </div>
  );
};

export default AllCategories;
