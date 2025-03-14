// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateProduct = () => {
//   const { prodId } = useParams(); // Get product ID from URL
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState({
//     productName: "",
//     categoryName: "",
//     brand: "",
//     dietaryType: "Veg",
//     mrp: "",
//     discountPercent: "",
//     weight: "",
//     stockQty: "",
//     productImage: null,
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch existing product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/product/${prodId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch product details.");
//         }
//         const data = await response.json();
//         setProductData(data);
//         setPreviewImage(data.productImage);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Failed to fetch product details.");
//       }
//     };

//     fetchProduct();
//   }, [prodId]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setProductData({ ...productData, [e.target.name]: e.target.value });
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProductData({ ...productData, productImage: file });

//     // Show image preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewImage(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
  
//     try {
//       const formData = new FormData();
  
//       // Append form fields
//       formData.append("productName", productData.productName);
//       formData.append("categoryName", productData.categoryName);
//       formData.append("brand", productData.brand);
//       formData.append("dietaryType", productData.dietaryType);
//       formData.append("mrp", productData.mrp);
//       formData.append("discountPercent", productData.discountPercent);
//       formData.append("weight", productData.weight);
//       formData.append("stockQty", productData.stockQty);
  
//       // Append product image only if a new file is selected
//       if (productData.productImage instanceof File) {
//         formData.append("productImage", productData.productImage);
//       }
  
//       const response = await fetch(`/api/productupdate/${prodId}`, {
//         method: "PUT",
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to update product.");
//       }
  
//       alert("Product updated successfully!");
//       navigate("/inventory"); // Redirect after successful update
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setError("Failed to update product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="container">
//       <h2>Update Product</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>Product Name:</label>
//         <input type="text" name="productName" value={productData.productName} onChange={handleChange} required />

//         <label>Category:</label>
//         <input type="text" name="categoryName" value={productData.categoryName} onChange={handleChange} required />

//         <label>Brand:</label>
//         <input type="text" name="brand" value={productData.brand} onChange={handleChange} required />

//         <label>Dietary Type:</label>
//         <select name="dietaryType" value={productData.dietaryType} onChange={handleChange}>
//           <option value="Veg">Veg</option>
//           <option value="Non-Veg">Non-Veg</option>
//           <option value="Vegan">Vegan</option>
//         </select>

//         <label>MRP:</label>
//         <input type="number" name="mrp" value={productData.mrp} onChange={handleChange} required />

//         <label>Discount (%):</label>
//         <input type="number" name="discountPercent" value={productData.discountPercent} onChange={handleChange} required />

//         <label>Weight:</label>
//         <input type="text" name="weight" value={productData.weight} onChange={handleChange} required />

//         <label>Stock Quantity:</label>
//         <input type="number" name="stockQty" value={productData.stockQty} onChange={handleChange} required />

//         <label>Product Image:</label>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         {previewImage && <img src={previewImage} alt="Product Preview" style={{ width: "150px", marginTop: "10px" }} />}

//         <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Product"}</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateProduct = () => {
//   const { prodId } = useParams(); // Get product ID from URL
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState({
//     productName: "",
//     categoryName: "",
//     brand: "",
//     dietaryType: "Veg",
//     mrp: "",
//     discountPercent: "",
//     weight: "",
//     stockQty: "",
//     productImage: null,
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch existing product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/product/${prodId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch product details.");
//         }
//         const data = await response.json();
        
//         // Set product details excluding the image as a File
//         setProductData({
//           productName: data.productName,
//           categoryName: data.categoryName,
//           brand: data.brand,
//           dietaryType: data.dietaryType,
//           mrp: data.mrp,
//           discountPercent: data.discountPercent,
//           weight: data.weight,
//           stockQty: data.stockQty,
//           productImage: null, // Reset image
//         });

//         // Set image preview from URL (not as Base64)
//         if (data.productImage) {
//           setPreviewImage(data.productImage);
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Failed to fetch product details.");
//       }
//     };

//     fetchProduct();
//   }, [prodId]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setProductData({ ...productData, [e.target.name]: e.target.value });
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProductData({ ...productData, productImage: file });

//     // Show image preview (not Base64)
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
  
//     try {
//       const formData = new FormData();
  
//       // Append form fields
//       formData.append("productName", productData.productName);
//       formData.append("categoryName", productData.categoryName);
//       formData.append("brand", productData.brand);
//       formData.append("dietaryType", productData.dietaryType);
//       formData.append("mrp", productData.mrp);
//       formData.append("discountPercent", productData.discountPercent);
//       formData.append("weight", productData.weight);
//       formData.append("stockQty", productData.stockQty);
  
//       // Append product image only if a new file is selected
//       if (productData.productImage) {
//         formData.append("productImage", productData.productImage);
//       }
  
//       const response = await fetch(`/api/productupdate/${prodId}`, {
//         method: "PUT",
//         body: formData, // No need to set headers manually for FormData
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to update product.");
//       }
  
//       alert("Product updated successfully!");
//       navigate("/inventory"); // Redirect after successful update
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setError("Failed to update product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="container">
//       <h2>Update Product</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>Product Name:</label>
//         <input type="text" name="productName" value={productData.productName} onChange={handleChange} required />

//         <label>Category:</label>
//         <input type="text" name="categoryName" value={productData.categoryName} onChange={handleChange} required />

//         <label>Brand:</label>
//         <input type="text" name="brand" value={productData.brand} onChange={handleChange} required />

//         <label>Dietary Type:</label>
//         <select name="dietaryType" value={productData.dietaryType} onChange={handleChange}>
//           <option value="Veg">Veg</option>
//           <option value="Non-Veg">Non-Veg</option>
//           <option value="Vegan">Vegan</option>
//         </select>

//         <label>MRP:</label>
//         <input type="number" name="mrp" value={productData.mrp} onChange={handleChange} required />

//         <label>Discount (%):</label>
//         <input type="number" name="discountPercent" value={productData.discountPercent} onChange={handleChange} required />

//         <label>Weight:</label>
//         <input type="text" name="weight" value={productData.weight} onChange={handleChange} required />

//         <label>Stock Quantity:</label>
//         <input type="number" name="stockQty" value={productData.stockQty} onChange={handleChange} required />

//         <label>Product Image:</label>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         {previewImage && <img src={previewImage} alt="Product Preview" style={{ width: "150px", marginTop: "10px" }} />}

//         <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Product"}</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateProduct = () => {
//   const { prodId } = useParams(); // Get product ID from URL
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState({
//     productName: "",
//     categoryName: "",
//     brand: "",
//     dietaryType: "Veg",
//     mrp: "",
//     discountPercent: "",
//     weight: "",
//     stockQty: "",
//     productImage: "",
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch existing product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/product/${prodId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch product details.");
//         }
//         const data = await response.json();

//         setProductData({
//           productName: data.productName,
//           categoryName: data.categoryName,
//           brand: data.brand,
//           dietaryType: data.dietaryType,
//           mrp: data.mrp,
//           discountPercent: data.discountPercent,
//           weight: data.weight,
//           stockQty: data.stockQty,
//           productImage: data.productImage, // Already in Base64 format
//         });

//         if (data.productImage) {
//           setPreviewImage(data.productImage);
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Failed to fetch product details.");
//       }
//     };

//     fetchProduct();
//   }, [prodId]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setProductData({ ...productData, [e.target.name]: e.target.value });
//   };

//   // Convert image to Base64
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setProductData({ ...productData, productImage: reader.result });
//       setPreviewImage(reader.result);
//     };
//     reader.onerror = (error) => {
//       console.error("Error converting image to Base64:", error);
//     };
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`/api/productupdate/${prodId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update product.");
//       }

//       alert("Product updated successfully!");
//       navigate("/inventory"); // Redirect after successful update
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setError("Failed to update product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Update Product</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>Product Name:</label>
//         <input type="text" name="productName" value={productData.productName} onChange={handleChange} required />

//         <label>Category:</label>
//         <input type="text" name="categoryName" value={productData.categoryName} onChange={handleChange} required />

//         <label>Brand:</label>
//         <input type="text" name="brand" value={productData.brand} onChange={handleChange} required />

//         <label>Dietary Type:</label>
//         <select name="dietaryType" value={productData.dietaryType} onChange={handleChange}>
//           <option value="Veg">Veg</option>
//           <option value="Non-Veg">Non-Veg</option>
//           <option value="Vegan">Vegan</option>
//         </select>

//         <label>MRP:</label>
//         <input type="number" name="mrp" value={productData.mrp} onChange={handleChange} required />

//         <label>Discount (%):</label>
//         <input type="number" name="discountPercent" value={productData.discountPercent} onChange={handleChange} required />

//         <label>Weight:</label>
//         <input type="text" name="weight" value={productData.weight} onChange={handleChange} required />

//         <label>Stock Quantity:</label>
//         <input type="number" name="stockQty" value={productData.stockQty} onChange={handleChange} required />

//         <label>Product Image:</label>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         {previewImage && <img src={previewImage} alt="Product Preview" style={{ width: "150px", marginTop: "10px" }} />}

//         <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Product"}</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { prodId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: "",
    categoryName: "",
    brand: "",
    dietaryType: "Veg",
    mrp: "",
    discountPercent: "",
    weight: "",
    stockQty: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${prodId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();

        setProductData({
          productName: data.productName,
          categoryName: data.categoryName,
          brand: data.brand,
          dietaryType: data.dietaryType,
          mrp: data.mrp,
          discountPercent: data.discountPercent,
          weight: data.weight,
          stockQty: data.stockQty,
        });

        if (data.productImage) {
          setPreviewImage(data.productImage);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [prodId]);

  // Handle input changes
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("categoryName", productData.categoryName);
    formData.append("brand", productData.brand);
    formData.append("dietaryType", productData.dietaryType);
    formData.append("mrp", productData.mrp);
    formData.append("discountPercent", productData.discountPercent);
    formData.append("weight", productData.weight);
    formData.append("stockQty", productData.stockQty);

    if (selectedFile) {
      formData.append("productImage", selectedFile);
    }

    try {
      const response = await fetch(`/api/productupdate/${prodId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      alert("Product updated successfully!");
      navigate("/inventory");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" name="productName" value={productData.productName} onChange={handleChange} required />

        <label>Category:</label>
        <input type="text" name="categoryName" value={productData.categoryName} onChange={handleChange} required />

        <label>Brand:</label>
        <input type="text" name="brand" value={productData.brand} onChange={handleChange} required />

        <label>Dietary Type:</label>
        <select name="dietaryType" value={productData.dietaryType} onChange={handleChange}>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Vegan">Vegan</option>
        </select>

        <label>MRP:</label>
        <input type="number" name="mrp" value={productData.mrp} onChange={handleChange} required />

        <label>Discount (%):</label>
        <input type="number" name="discountPercent" value={productData.discountPercent} onChange={handleChange} required />

        <label>Weight:</label>
        <input type="text" name="weight" value={productData.weight} onChange={handleChange} required />

        <label>Stock Quantity:</label>
        <input type="number" name="stockQty" value={productData.stockQty} onChange={handleChange} required />

        <label>Product Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewImage && <img src={previewImage} alt="Product Preview" style={{ width: "150px", marginTop: "10px" }} />}

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Product"}</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
