import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import upload from "../Middleware/upload.js";
import Product from "../Models/product.js";
import Category from "../Models/category.js";

const productRoutes = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};


productRoutes.post("/addProducts", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
        try {
          const { productName, productId, categoryName, brand, dietaryType, mrp, discountPercent, weight, stockQty } = req.body;

          const existingProduct = await Product.findOne({ productId });
          if (existingProduct) {
            return res.status(400).json({ message: "Product already exists!" });
          }
      
          const categoryData = await Category.findOne({ catName: categoryName });
          if (!categoryData) {
            return res.status(400).json({ message: "Invalid category!" });
          }
      
          let imageBase64 = null;
          if (req.file) {
            imageBase64 = convertToBase64(req.file.buffer);
          }
      
          const discountedPrice = mrp - (mrp * discountPercent) / 100;
      
          const newProduct = new Product({
            productName,
            productId,
            categoryName: categoryData._id,
            brand,
            dietaryType,
            mrp,
            discountPercent,
            discountedPrice,
            weight,
            stockQty,
            productImage: imageBase64,
          });
      
          await newProduct.save();
          res.status(201).json({ message: "Product added successfully!" });
      
        } catch (error) {
          console.error("Error adding product:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }}
);

productRoutes.put('/updateProduct', authenticate,adminCheck,upload.single("productImage"), async (req, res) => {
    try {
        const { productName, productId, categoryName, brand, dietaryType, mrp, discountPercent, weight, stockQty } = req.body;

        const result = await Product.findOne({ productId:productId });
        if (result) {
            
            const OfferPrice = mrp ? mrp - (mrp * (discountPercent || result.discountPercent) / 100) : result.discountedPrice;
            
            result.productName = productName || result.productName;
            result.categoryName = categoryName || result.categoryName;
            result.brand = brand || result.brand;
            result.dietaryType = dietaryType || result.dietaryType;
            result.mrp = mrp || result.mrp;
            result.discountPercent = discountPercent || result.discountPercent;
            result.discountedPrice = OfferPrice;
            result.weight = weight || result.weight;
            result.stockQty = stockQty || result.stockQty;

            if (req.file) {
                result.productImage = convertToBase64(req.file.buffer);
            }

            await result.save();
            res.status(200).json({ message: "Product updated successfully" });
            
        }else{
            return res.status(404).json({ message: "Product doesn't exist" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
);

productRoutes.delete('/deleteProduct',authenticate,adminCheck, async (req,res)=>{
    try{
        const {productId} = req.body;
        const result = await Product.findOne({ productId:productId });
        console.log(result);
        if(result){
            await Product.findOneAndDelete({ productId:productId });
            res.status(200).json({msg:"Product deleted successfully"});
        }else{
            res.status(404).json({msg:"Product not found"});
        }
    } catch{
        res.status(500).json({msg:"Internal Server Error"})
    }
});


productRoutes.get("/allproducts", async (req, res) => {
    try {
      const products = await Product.find();
  
      if (!products.length) {
        return res.status(404).json({ message: "No products available" });
      }
  
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  });
  
  
  productRoutes.get("/productsDetails/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate("categoryName", "catName");
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  });
  
  
  productRoutes.get("/productsbycategory/:categoryName", async (req, res) => {
    try {
        const { categoryName } = req.params;  
        const categoryDoc = await Category.findOne({ catName: categoryName });

        if (!categoryDoc) {
            return res.status(404).json({ message: "Category not found" });
        }

        const products = await Product.find({ category: categoryDoc._id }).populate("category", "catName");

        if (!products.length) {
            return res.status(404).json({ message: `No products found in category: ${categoryName}` });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});


export { productRoutes }
