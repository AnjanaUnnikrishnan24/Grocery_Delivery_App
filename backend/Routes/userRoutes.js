import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import { prodSchema} from "../Models/prodSchema.js";
import { checkoutSchema } from "../Models/checkoutSchema.js";
import { cartSchema } from "../Models/cart.js";

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
        const { id, quantity } = req.body; 
        // Find the product by productId
        const product = await prodSchema.findOne({productId: id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Assuming user data is already available after authentication (req.user)
        const user = req.user; // This is typically set by the authenticate middleware
        
        // Check if the product already exists in the user's cart
        const existingProduct = user.cart.find(item => item.productId == id);
        if (existingProduct) {
            // If the product is already in the cart, update the quantity
            existingProduct.quantity += Number(quantity);
        } else {
            // If the product is not in the cart, add it
            user.cart.push({ productId: id, quantity: Number(quantity) });
        }

        // Save the updated user data
        await user.save();

        // Respond with a success message and the updated cart
        res.json({ message: 'Product added to cart', cart: user.cart });

    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
})

export {userRoutes}