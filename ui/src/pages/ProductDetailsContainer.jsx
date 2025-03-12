import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsPage from "./ProductDetailsPage";

const ProductDetailsContainer = () => {
  const { id } = useParams(); // expects route like /productDetailsPage/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/productsDetails/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product details: ${response.statusText}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return <ProductDetailsPage product={product} />;
};

export default ProductDetailsContainer;
