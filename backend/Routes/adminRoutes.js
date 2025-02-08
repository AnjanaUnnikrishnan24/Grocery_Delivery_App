import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import { prodSchema} from "../Models/prodSchema.js";
//import upload from "../Middleware/upload.js";

const adminRoutes = Router();

adminRoutes.post('/addProducts', authenticate, adminCheck, async (req,res)=>{
    try {
        const { ProductName,ProductId,prodCategory,prodBrand,prodType,prodPrice,prodWeight,pQuantity,StockStatus } = req.body
        console.log(ProductName);
        const oldProduct = await prodSchema.findOne({productId:ProductId})
        if(oldProduct){
            res.status(401).send("Product Already exist");
        }else{
            //const imagePath= req.file ? req.file.path:"";
            const newProduct = new prodSchema({
                name:ProductName,
                productId:ProductId,
                //Image:imagePath,
                category:prodCategory,
                brand:prodBrand,
                type:prodType,
                price:prodPrice,
                weight:prodWeight,
                quantity:pQuantity,
                stockStatus:StockStatus
            });
            await newProduct.save();
            res.status(200).send("Product added successfully")
        }
    } catch(error) {
        console.log(error);
        
        res.status(500).json({ message: "Internal Server Error" });
    }
});


adminRoutes.put('/updateProduct', authenticate,adminCheck, async (req, res) => {
    try {
        const { ProductName,ProductId,prodCategory,prodBrand,prodType,prodPrice,prodWeight,pQuantity,StockStatus } = req.body;
        const result = await prodSchema.findOne({ productId:ProductId });
        console.log(result);
        
        if(result){
            result.name=ProductName,
            result.productId=ProductId,
            //Image:imagePath,
            result.category=prodCategory,
            result.brand=prodBrand,
            result.type=prodType,
            result.price=prodPrice,
            result.weight=prodWeight,
            result.quantity=pQuantity,
            result.stockStatus=StockStatus

            await result.save();
            res.status(201).send("Product updated successfully")
        }else{
            res.status(404).send("Product doesn't exist")
        }  
    }catch{
        res.status(500).send("Internal Server Error" );
    }
});

adminRoutes.delete('/deleteProduct',authenticate,adminCheck, async (req,res)=>{
    try{
        const {ProductId} = req.body;
        const result = await prodSchema.findOne({ productId:ProductId });
        console.log(result);
        if(result){
            await prodSchema.findOneAndDelete({ productId:ProductId });
            res.status(200).json({msg:"Product deleted successfully"});
        }else{
            res.status(404).json({msg:"Product not found"});
        }
    } catch{
        res.status(500).json({msg:"Internal Server Error"})
    }
});


adminRoutes.get('/inventory',authenticate,adminCheck, async (req,res)=>{
    try {
        const allProducts = await prodSchema.find();
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

        const products = await prodSchema.find({
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

// adminRoutes.get('/orders', authenticate, adminCheck, async (req, res) => {
//     try {
//         const orders = await orderSchema.find();  
//         res.status(200).json(orders);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });


export { adminRoutes }

