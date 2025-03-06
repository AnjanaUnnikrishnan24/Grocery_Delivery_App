import React from "react";
import { banner } from "../assets";
import UserNavBar from "../components/UserNavBar";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";


const HomePage = () => {
  return (
    <>
      <UserNavBar />
      <div>
        {/* Banner Section */}
        <div className="mt-32">
          <img src={banner} className="w-full" alt="Banner" />
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
