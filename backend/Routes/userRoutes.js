import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import { prodSchema} from "../Models/prodSchema.js";
import { checkoutSchema } from "../Models/checkoutSchema.js";
import { cartSchema } from "../Models/cart.js";
import { UserSchema } from "../Models/userSchema.js";
import upload from "../Middleware/upload.js";
import sharp from "sharp"


const userRoutes = Router();

userRoutes.get('/allproducts', async (req, res) => {
    try {
        const products = await prodSchema.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRoutes.get('/getProducts', async (req, res) => {
    try {
        const { ProductId } = req.body;
        const product = await prodSchema.findOne({ productId:ProductId });

        if (product) {
        //     const imageBuffer = Buffer.from(result.image, "base64");

        //     const compressedImage = await sharp(imageBuffer)
        //     .resize({ width: 300 }) 
        //     .jpeg({ quality: 70 }) 
        //     .toBuffer();
           
        //    res.set({
        //     "Content-Type": "image/png",
        //     "Content-Disposition": 'attachment; filename="pImage.png"'});
        //     res.send(compressedImage);
            
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRoutes.post('/addProdCart',authenticate,userCheck,async(req,res)=>{  
    try {
        const { productId, quantity } = req.body;

        const product = await prodSchema.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const userId =await UserSchema.findOne({_id:req.body.User_id});
        console.log(userId._id);
        
        
        const existingCart = await cartSchema.findOne({ productId, userId});
        if (existingCart) {
            existingCart.quantity += quantity; 
            await existingCart.save();
            return res.status(200).json({ message: "Product quantity updated in cart" });
        }

        const newCartItem = new cartSchema({
            productId:productId,
            quantity:quantity,
            price: product.price,
            weight: product.weight,
            userId:userId._id
        });

        await newCartItem.save();
        res.status(201).json({ message: "Product added to cart successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

userRoutes.post('/viewCart',authenticate,userCheck,async(req,res)=>{
    try {
        
        const cartItems = await cartSchema.find();

        if (cartItems.length === 0) {
            return res.status(404).json({ message: "Your cart is empty" });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

userRoutes.post('/checkout',authenticate,userCheck,async(req,res)=>{
    try {
        const {userId, name, address, location, contactnumber } = req.body;

        const cartItems = await cartSchema.findOne({ userId:req.body.userId });
        console.log(cartItems);
        
        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Your cart is empty. Please add products to proceed with checkout" });
        }

        const newCheckout = new checkoutSchema({
            userId:userId,
            name:name,
            address:address,
            location:location,
            contactnumber:contactnumber
        });

        await newCheckout.save();

        await cartSchema.deleteMany({ userId: req.user });

        res.status(200).json({ message: "Checkout completed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export {userRoutes}