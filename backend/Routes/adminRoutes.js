import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import upload from "../Middleware/upload.js";
import {product} from "../Models/product.js"
import Category from "../Models/category.js";

const adminRoutes = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

adminRoutes.post("/addProducts", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
        try {
            const { ProductName, ProductId, Category,SubCategory, Brand, DietaryType, MRP,  DiscountPercent, Weight, StockQty } = req.body;

            // Check if productId already exists
            const existingProduct = await product.findOne({ productId:ProductId });
            if (existingProduct) {
                return res.status(400).json({ message: "Product already exists!" });
            }

            let imageBase64 = null;
            if (req.file) {
                imageBase64 = convertToBase64(req.file.buffer);
            }

            // Calculate discounted price
            const OfferPrice = MRP - (MRP * DiscountPercent / 100);

            const newProduct = new product({
                productName:ProductName, 
                productId:ProductId,
                category: Category, 
                subCategory:SubCategory,
                brand:Brand, 
                dietaryType:DietaryType, 
                mrp:MRP,  
                discountPercent:DiscountPercent,
                discountedPrice:OfferPrice,
                weight:Weight,
                stockQty:StockQty,
                productImage: imageBase64
            });

            await newProduct.save();
            res.status(201).json({ message: "Product added successfully!" });

        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

adminRoutes.put('/updateProduct', authenticate,adminCheck,upload.single("productImage"), async (req, res) => {
    try {
        const { ProductName, ProductId, Category,SubCategory, Brand, DietaryType, MRP,  DiscountPercent, Weight, StockQty } = req.body;

        // Find product by productId
        const result = await product.findOne({ productId:ProductId });
        if (result) {
            
            // Calculate discounted price
            const OfferPrice = MRP ? MRP - (MRP * (DiscountPercent || result.discountPercent) / 100) : result.discountedPrice;
            
            // Update fields
            result.productName = ProductName || result.productName;
            result.category = Category || result.category;
            result.subCategory = SubCategory || result.subCategory;
            result.brand = Brand || result.brand;
            result.dietaryType = DietaryType || result.dietaryType;
            result.mrp = MRP || result.mrp;
            result.discountPercent = DiscountPercent || result.discountPercent;
            result.discountedPrice = OfferPrice;
            result.weight = Weight || result.weight;
            result.stockQty = StockQty || result.stockQty;


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

adminRoutes.delete('/deleteProduct',authenticate,adminCheck, async (req,res)=>{
    try{
        const {ProductId} = req.body;
        const result = await product.findOne({ productId:ProductId });
        console.log(result);
        if(result){
            await product.findOneAndDelete({ productId:ProductId });
            res.status(200).json({msg:"Product deleted successfully"});
        }else{
            res.status(404).json({msg:"Product not found"});
        }
    } catch{
        res.status(500).json({msg:"Internal Server Error"})
    }
});


adminRoutes.post("/addCategory", authenticate, adminCheck, async (req, res) => {
    try {
        const { catName, catImage, subCategories } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ catName });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists!" });
        }

        // Create new category
        const newCategory = new Category({
            catName,
            catImage,
            subCategories: subCategories.map(subCat => ({ subCatName: subCat })) 
        });

        await newCategory.save();
        res.status(201).json({ message: "Category added successfully!" });

    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// View All Categories
adminRoutes.get("/categories", authenticate, adminCheck, async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found!" });
        }

        res.status(200).json(categories);

    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// View All Subcategories
adminRoutes.get("/subcategories", authenticate, adminCheck, async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found!" });
        }

        const subcategories = categories.flatMap(category => 
            category.subCategories.map(subCat => ({
                categoryId: category._id,
                categoryName: category.catName,
                subCategoryId: subCat._id,
                subCategoryName: subCat.subCatName
            }))
        );

        if (subcategories.length === 0) {
            return res.status(404).json({ message: "No subcategories found!" });
        }

        res.status(200).json(subcategories);

    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Delete a Category by ID
adminRoutes.delete("/deleteCategory/:categoryId", authenticate, adminCheck, async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found!" });
        }

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ message: "Category deleted successfully!" });

    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

adminRoutes.get('/inventory',authenticate,adminCheck, async (req,res)=>{
    try {
        const allProducts = await product.find();
        console.log(allProducts);
        
        res.status(200).json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

adminRoutes.get('/searchProduct', authenticate, adminCheck, async (req, res) => {
    try {
        const { searchValue } = req.body;

        if (!searchValue) {
            return res.status(400).json({ message: "Search value is required" });
        }

        const products = await product.find({
            $or: [
                { name: { $regex: searchValue, $options: "i" } },
                { category: { $regex: searchValue, $options: "i" } },
                { brand: { $regex: searchValue, $options: "i" } }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching your search" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



export { adminRoutes }

