import React, { useState } from "react";

const AddProduct = () => {
  const [productName,setProductName]=useState('') 
  const [productId,setProductId]=useState('')  
  const [category,setCategory]=useState('')  
  const [subCategory,setSubCategory]=useState('') 
  const [dietaryType,setDietaryType]=useState('Veg') 
  const [brand,setBrand]=useState('')  
  const [mrp,setMrp]=useState('')  
  const [discountPercent,setDiscountPercent]=useState('') 
  const [weight,setWeight]=useState('')  
  const [stockQty,setStockQty]=useState('') 
  const [productImage,setProductImage]=useState(null) 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("ProductName",productName);
      formData.append("ProductId",productId);
      formData.append("Category",category);
      formData.append("SubCategory",subCategory);
      formData.append("Brand",brand);
      formData.append("DietaryType",dietaryType);
      formData.append("MRP",mrp);
      formData.append("DiscountPercent",discountPercent);
      formData.append("Weight",weight);
      formData.append("StockQty",stockQty);
      
      if(productImage){
        formData.append("productImage",productImage);
      }
      
      const response = await fetch("/api/addproducts",{
        method:"POST",
        credentials:"include",
        body:formData,
      });

      if(!response.ok){
        throw new Error("Error adding products");
      }
      alert("Product added successfully!");
      setProductName("");
      setProductId("");
      setCategory("");
      setSubCategory("");
      setDietaryType("Veg");
      setBrand("");
      setMrp("");
      setDiscountPercent("");
      setWeight("");
      setStockQty("");
      setProductImage(null);
    }catch(err){
      console.error(err);
      alert("Something went wrong" + err.message);
    }
  };

  return (
    <>
    <div className="bg-gray-200 font-sans">
      <main className="ml-72 p-8 bg-white shadow-lg rounded-lg w-[75%] mt-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Add a New Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={productName}
                onChange={(e)=>setProductName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product ID
              </label>
              <input
                type="number"
                name="productId"
                value={productId}
                onChange={(e)=>setProductId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Category
              </label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Sub Category
              </label>
              <input
                type="text"
                name="category"
                value={subCategory}
                onChange={(e)=>setSubCategory(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dietary Preference
              </label>
              <select
                name="dietaryType"
                value={dietaryType}
                onChange={(e)=>setDietaryType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Brand
              </label>
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                MRP (Rs)
              </label>
              <input
                type="number"
                name="mrp"
                value={mrp}
                onChange={(e)=>setMrp(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountPercent"
                value={discountPercent}
                onChange={(e)=>setDiscountPercent(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Weight (g/kg/ml/l)
              </label>
              <input
                type="text"
                name="weight"
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQty"
                value={stockQty}
                onChange={(e)=>setStockQty(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e)=>{
                  if(e.target.files && e.target.files[0]){
                    {setProductImage(e.target.files[0])}
                  }
                }}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium "
             >
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
    </>
  );
};

export default AddProduct;
