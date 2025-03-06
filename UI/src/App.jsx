import React from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import AuthLayout from './layouts/AuthLayout';
import MainLayout from "./layouts/MainLayout";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";


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
          
        </Route>



    
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
