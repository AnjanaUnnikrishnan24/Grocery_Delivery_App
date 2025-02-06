import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import { prodSchema } from "../Models/prodSchema.js";
import upload from "../Middleware/upload.js";

const adminRoutes = Router();

adminRoutes.post('/addProducts',authenticate,adminCheck,upload.single('prodImage'),async (req,res)=>{
    try {
        const { ProductName,ProductId,prodCategory,prodBrand,prodType,prodPrice,prodWeight,pQuantity } = req.body
        console.log(ProductName);
        const oldProduct = await prodSchema.findOne({name:ProductName})
        if(oldProduct){
        }else{
            const imagePath= req.file ? req.file.path:"";
            const newProduct = new prodSchema({
                name:ProductName,
                pid:ProductId,
                Image:imagePath,
                category:prodCategory,
                brand:prodBrand,
                type:prodType,
                price:prodPrice,
                weight:prodWeight,
                quantity:pQuantity
            });
            await newProduct.save();
            res.status(500).send("Product added successfully")
        }
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
