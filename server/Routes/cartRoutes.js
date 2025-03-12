import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Product from "../Models/product.js";
import Users from "../Models/user.js";

const cartRoutes = Router();


cartRoutes.get("/viewCart", authenticate, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).populate("shoppingCart.productId", "productName brand productImage discountedPrice");

        if (!user) return res.status(404).json({ message: "User not found!" });

        res.status(200).json({ cart: user.shoppingCart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


cartRoutes.post("/addCartProducts", authenticate, async (req, res) => {
    try {
        console.log("Authenticated User ID:", req.user.id);

        const { productId, quantity } = req.body;
        const qty = Math.floor(quantity); 

        if (!productId || qty < 1) {
            return res.status(400).json({ message: "Invalid product or quantity!" });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found!" });

        const user = await Users.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found!" });

        if (!user.shoppingCart) {
            user.shoppingCart = [];
        }

        const cartItem = user.shoppingCart.find(item => item.productId.toString() === productId);

        if (cartItem) {
            cartItem.quantity += qty;
        } else {
            user.shoppingCart.push({ productId, quantity: qty, price: product.discountedPrice });
        }

        await user.save();

        res.status(200).json({ message: "Product added to cart!", cart: user.shoppingCart });

    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


cartRoutes.delete("/removeproduct/:productId", authenticate, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found!" });

        user.shoppingCart = user.shoppingCart.filter(item => item.productId.toString() !== req.params.productId);
        await user.save();
        res.status(200).json({ message: "Product removed from cart!", cart: user.shoppingCart });

    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

cartRoutes.put("/updateQty", authenticate, async (req, res) => {
        try {
            const { quantity } = req.body;
            if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1!" });
    
            const user = await Users.findById(req.user.id);
            if (!user) return res.status(404).json({ message: "User not found!" });
    
            const cartItem = user.shoppingCart.find(item => item.productId.equals(req.params.productId));
            if (!cartItem) return res.status(404).json({ message: "Product not found in cart!" });
    
            cartItem.quantity = quantity;
            await user.save();
            res.status(200).json({ message: "Cart updated!", cart: user.shoppingCart });
    
        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });


cartRoutes.delete("/clearCart", authenticate, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found!" });

        user.shoppingCart = [];
        await user.save();
        res.status(200).json({ message: "Cart cleared!" });

    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export { cartRoutes };
