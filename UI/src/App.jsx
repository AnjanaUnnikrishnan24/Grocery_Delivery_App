import React from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import AuthLayout from './layouts/AuthLayout';
import MainLayout from "./layouts/MainLayout";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import AddProduct from "./pages/adminPages/AddProduct"
import HomePage from "./pages/HomePage"
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ContactPage from "./pages/ContactPage";
import AddCategory from "./pages/adminPages/AddCategory";
import UserProfilePage from "./pages/UserProfilePage";
import AddAddressPage from "./pages/AddAddressPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import UpdateProduct from "./pages/adminPages/UpdateProduct";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="/" element={<MainLayout/>}>
          <Route path="about" element={<About />}/>
          <Route path="addproducts" element={<AddProduct/>}/>
          <Route path="home" element={<HomePage/>}/>
          <Route path="allproducts" element={<ProductListingPage/>}/>
          <Route path="productDetails" element={<ProductDetailsPage/>}/>
          <Route path="contacts" element={<ContactPage/>}/>
          <Route path="category" element={<AddCategory/>}/>
          <Route path="profile" element={<UserProfilePage/>}/>
          <Route path="address" element={<AddAddressPage/>}/>
          <Route path="cart" element={<CartPage/>}/>
          <Route path="checkout" element={<CheckoutPage/>}/>
          <Route path="update" element={<UpdateProduct/>}/>
          
          
        </Route>



    
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
