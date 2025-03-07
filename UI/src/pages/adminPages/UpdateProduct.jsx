import React, {useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const UpdateProduct = () => {
    const {productId} = useParams();
    const navigate = useNavigate();

    const [productName,setProductName]=useState('')   
    const [category,setCategory]=useState('')  
    const [subCategory,setSubCategory]=useState('') 
    const [dietaryType,setDietaryType]=useState('Veg') 
    const [brand,setBrand]=useState('')  
    const [mrp,setMrp]=useState('')  
    const [discountPercent,setDiscountPercent]=useState('') 
    const [weight,setWeight]=useState('')  
    const [stockQty,setStockQty]=useState('') 
    const [productImage,setProductImage]=useState(null)
    const [loading,setLoading] = useState('')
    const [error,setError] = useState('')

    const [categories,setCategories] = useState([])
    const [subcategories,setSubCategories] = useState([])

    

    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/getProduct/${productId}`);
          const data = await res.json();
  
          if (!res.ok) {
            throw new Error(data.message || "Failed to fetch product details");
          }
  
          // Populate the form fields
          setProductName(data.productName);
          setCategory(data.category);
          setSubCategory(data.subCategory);
          setDietaryType(data.dietaryType);
          setBrand(data.brand);
          setMrp(data.mrp);
          setDiscountPercent(data.discountPercent);
          setWeight(data.weight);
          setStockQty(data.stockQty);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [productId]);
  
    // Fetch categories and subcategories
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await fetch("/api/categories");
          const data = await res.json();
          setCategories(data);
        } catch (err) {
          console.error("Error fetching categories:", err);
        }
      };
  
      const fetchSubCategories = async () => {
        try {
          const res = await fetch("/api/subCategories");
          const data = await res.json();
          setSubCategories(data);
        } catch (err) {
          console.error("Error fetching subcategories:", err);
        }
      };
  
      fetchCategories();
      fetchSubCategories();
    }, []);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        setError("");
  
        const updatedProduct = {
          productName,
          category,
          subCategory,
          brand,
          dietaryType,
          mrp,
          discountPercent,
          weight,
          stockQty,
        };
  
        const res = await fetch(`/api/updateProduct/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedProduct),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || "Failed to update product");
        }
  
        toast.success("Product updated successfully!");
        navigate("/home");
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) return <div className="p-4">Loading Product data...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
  

  return (
    <>
    <div className="bg-gray-200 font-sans">
      <main className="ml-72 p-8 bg-white shadow-lg rounded-lg w-[75%] mt-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Update Product
        </h2>

        <form onSubmit={submitForm}>
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
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SubCategory Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Sub Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select SubCategory</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
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
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Brand
              </label>
              <input
                type="text"
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
                onChange={(e)=>setProductImage(e.target.files[0])}
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
              Update Product
            </button>
          </div>
        </form>
      </main>
    </div>
    </>
  )
}

export default UpdateProduct