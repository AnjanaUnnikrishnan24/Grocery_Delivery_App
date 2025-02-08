import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import { prodSchema} from "../Models/prodSchema.js";
import { UserSchema } from "../Models/userSchema.js";
import { checkoutSchema } from "../Models/checkoutSchema.js";

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
    const { id, quantity } = req.body; // Assuming the quantity is passed in params

    try {
        // Find the product by productId
        const product = await prodSchema.findOne({ productId: id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the user based on the logged-in email
        const user = await UserSchema.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the product already exists in the user's cart
        const existingProduct = user.cart.find(item => item.productId == id);
        if (existingProduct) {
            // Update quantity if product already exists in the cart
            existingProduct.quantity = Number(existingProduct.quantity) + Number(quantity);
            product.quantity = Number(product.quantity) - Number(quantity); // Update product quantity
        } else {
            // Add product to cart if not already present
            user.cart.push({ productId: id, quantity: quantity });
            product.quantity = Number(product.quantity) - Number(quantity); // Update product quantity
        }

        // Save updated user data and product data
        await user.save();
        await product.save();

        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
})

export {userRoutes}