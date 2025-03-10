import React from "react";
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddCategory from "./pages/adminPages/AddCategory";
import AddProduct from "./pages/adminPages/AddProduct"; 
import AdminDashboard from "./pages/adminPages/AdminDashboard"; 
import OrderManage from "./pages/adminPages/OrderManage";
import ProductsManage from "./pages/adminPages/ProductsManage";
import UpdateProduct from "./pages/adminPages/UpdateProduct";
import About from "./pages/About";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListingPage from "./pages/ProductListingPage";

const  App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        {/* admin pages */}
        <Route path='/addCategory' element={<AddCategory/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/orderManage' element={<OrderManage/>}/>
        <Route path='/productManage' element={<ProductsManage/>}/>
        <Route path='/UpdateProduct' element={<UpdateProduct/>}/>
        {/* customer pages */}
        <Route path='/about' element={<About/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/contacts' element={<ContactPage/>}/>
        <Route path='/History' element={<OrderHistoryPage/>}/>
        <Route path="/productDetailsPage/:id" element={<ProductDetailsPage />} />
        <Route path='/listing' element={<ProductListingPage/>}/>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App;