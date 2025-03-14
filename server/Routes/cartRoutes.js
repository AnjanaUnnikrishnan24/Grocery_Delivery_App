// import { Router } from "express";
// import authenticate from "../Middleware/auth.js";
// import Product from "../Models/product.js";
// import Users from "../Models/user.js";

// const cartRoutes = Router();


// cartRoutes.get("/viewCart", authenticate, async (req, res) => {
//     try {
//         const user = await Users.findById(req.user.id).populate("shoppingCart.productId", "productName brand productImage discountedPrice");

//         if (!user) return res.status(404).json({ message: "User not found!" });

//         res.status(200).json({ cart: user.shoppingCart });
//     } catch (error) {
//         console.error("Error fetching cart:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });


// cartRoutes.post("/addCartProducts", authenticate, async (req, res) => {
//     try {
//         console.log("Authenticated User ID:", req.user.id);

//         const { productId, quantity } = req.body;
//         const qty = Math.floor(quantity); 

//         if (!productId || qty < 1) {
//             return res.status(400).json({ message: "Invalid product or quantity!" });
//         }

//         const product = await Product.findById(productId);
//         if (!product) return res.status(404).json({ message: "Product not found!" });

//         const user = await Users.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found!" });

//         if (!user.shoppingCart) {
//             user.shoppingCart = [];
//         }

//         const cartItem = user.shoppingCart.find(item => item.productId.toString() === productId);

//         if (cartItem) {
//             cartItem.quantity += qty;
//         } else {
//             user.shoppingCart.push({ productId, quantity: qty, price: product.discountedPrice });
//         }

//         await user.save();

//         res.status(200).json({ message: "Product added to cart!", cart: user.shoppingCart });

//     } catch (error) {
//         console.error("Error adding product to cart:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });


// cartRoutes.delete("/removeproduct/:productId", authenticate, async (req, res) => {
//     try {
//         const user = await Users.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found!" });

//         user.shoppingCart = user.shoppingCart.filter(item => item.productId.toString() !== req.params.productId);
//         await user.save();
//         res.status(200).json({ message: "Product removed from cart!", cart: user.shoppingCart });

//     } catch (error) {
//         console.error("Error removing product from cart:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// cartRoutes.put("/updateQty", authenticate, async (req, res) => {
//         try {
//             const { quantity } = req.body;
//             if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1!" });
    
//             const user = await Users.findById(req.user.id);
//             if (!user) return res.status(404).json({ message: "User not found!" });
    
//             const cartItem = user.shoppingCart.find(item => item.productId.equals(req.params.productId));
//             if (!cartItem) return res.status(404).json({ message: "Product not found in cart!" });
    
//             cartItem.quantity = quantity;
//             await user.save();
//             res.status(200).json({ message: "Cart updated!", cart: user.shoppingCart });
    
//         } catch (error) {
//             console.error("Error updating cart:", error);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     });


// cartRoutes.delete("/clearCart", authenticate, async (req, res) => {
//     try {
//         const user = await Users.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found!" });

//         user.shoppingCart = [];
//         await user.save();
//         res.status(200).json({ message: "Cart cleared!" });

//     } catch (error) {
//         console.error("Error clearing cart:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// export { cartRoutes };


import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Product from "../Models/product.js";
import Cart from "../Models/cart.js";
import userCheck from "../Middleware/userCheck.js"

const cartRoutes = Router();

// View Cart
cartRoutes.get("/viewCart", authenticate,userCheck, async (req, res) => {
    try {
        const cartItems = await Cart.find({ userId: req.user.id })
            .populate("prodId", "productName brand productImage discountedPrice");

        res.json({ cart: cartItems });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


cartRoutes.post("/addToCart", authenticate,userCheck, async (req, res) => {
    try {
        console.log("Authenticated User:", req.user); // Debugging line

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: Please log in to add items to the cart." });
        }

        const { prodId, quantity } = req.body;
        const qty = Math.max(1, Math.floor(quantity || 1));

        if (!prodId) {
            return res.status(400).json({ message: "Product ID is required!" });
        }

        const product = await Product.findById(prodId);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        const cartItem = await Cart.findOneAndUpdate(
            { userId: req.user.id, prodId },
            { $inc: { quantity: qty } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ message: "Product added to cart!", cartItem });

    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// Update Cart Quantity
cartRoutes.put("/update/:prodId", authenticate,userCheck, async (req, res) => {
    try {
        const { quantity } = req.body;
        if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1!" });

        const cartItem = await Cart.findOne({ userId: req.user.id, prodId: req.params.prodId });
        if (!cartItem) return res.status(404).json({ message: "Product not found in cart!" });

        cartItem.quantity = quantity;
        await cartItem.save();
        
        res.json({ message: "Cart updated!", cartItem });

    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Remove Product from Cart
cartRoutes.delete("/remove/:prodId", authenticate,userCheck, async (req, res) => {
    try {
        const deletedItem = await Cart.findOneAndDelete({ userId: req.user.id, prodId: req.params.prodId });

        if (!deletedItem) return res.status(404).json({ message: "Product not found in cart!" });

        res.status(200).json({ message: "Product removed from cart!" });

    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Clear Cart
cartRoutes.delete("/clearCart", authenticate,userCheck, async (req, res) => {
    try {
        await Cart.deleteMany({ userId: req.user.id });

        res.status(200).json({ message: "Cart cleared!" });

    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export { cartRoutes };

