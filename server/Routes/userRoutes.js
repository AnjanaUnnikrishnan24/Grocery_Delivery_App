import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import Product from "../Models/product.js";
import Users from "../Models/user.js"

const userRoutes = Router();

userRoutes.get('/getProducts/:productId', async (req, res) => {
  try {
      const { productId } = req.params; 
      const product = await Product.findById(productId);
      if (product) {     
          res.json(product);
      } else {
          res.status(404).json({ message: "Product not found" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoutes.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoutes.get("/productsbycategory/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({catName:category },);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoutes.get("/getuser", authenticate, async (req, res) => {
  try {
    const user = await Users.findById(req.user_id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


userRoutes.patch("/updateuser", authenticate, userCheck, async (req, res) => {
  try {
    const { fullName, phone, addresses } = req.body;

    const user = await Users.findById(req.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;

    if (addresses && Array.isArray(addresses)) {
      user.addresses = addresses.map((addr) => ({
        address_line: addr.address_line,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        country: addr.country,
      }));
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

userRoutes.get('/searchProduct', async (req, res) => {
    try {
        const { searchValue } = req.body;

        if (!searchValue) {
            return res.status(400).json({ message: "Search value is required" });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: searchValue, $options: "i" } },
                { category: { $regex: searchValue, $options: "i" } },
                { brand: { $regex: searchValue, $options: "i" } }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching your search" });
        }

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



export {userRoutes}