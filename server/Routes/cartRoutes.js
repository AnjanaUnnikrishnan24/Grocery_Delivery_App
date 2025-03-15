import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Product from "../Models/product.js";
import User from "../Models/user.js";
import Order from "../Models/order.js";
import Address from "../Models/Address.js";

const cartRoutes = Router();

cartRoutes.post("/addToCart", authenticate, async (req, res) => {
    const { prodId } = req.body; 
    const quantity = 1;  

    try {
        // Find the product
        const product = await Product.findById(prodId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if product already exists in cart
        const existingProduct = user.shoppingCart.find(item => item.prodId == prodId);
        if (existingProduct) {
            existingProduct.quantity = quantity;
        } else {
            user.shoppingCart.push({ prodId, quantity });
        }

        // Update product stock quantity
        if (product.stockQty < quantity) {
            return res.status(400).json({ error: 'Not enough stock available' });
        }
        product.stockQty -= quantity;

        // Save updates to DB
        await user.save();
        await product.save();

        res.json({ message: 'Product added to cart', shoppingCart: user.shoppingCart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

cartRoutes.get("/cart", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "shoppingCart.prodId",
            model: Product,
            select: "productName mrp discountedPrice productImage quantity"
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ shoppingCart: user.shoppingCart });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        res.status(500).json({ error: "Failed to retrieve cart" });
    }
});


cartRoutes.delete("/remove/:prodId", authenticate, async (req, res) => {
    const { prodId } = req.params;

    try {
        // Find the user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the product in the cart
        const cartItemIndex = user.shoppingCart.findIndex(item => item.prodId == prodId);
        if (cartItemIndex === -1) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        // Get the quantity of the removed item
        const removedItem = user.shoppingCart[cartItemIndex];

        // Remove the product from the cart
        user.shoppingCart.splice(cartItemIndex, 1);

        // Find the product to restore stock
        const product = await Product.findById(prodId);
        if (product) {
            product.quantity += removedItem.quantity;
            await product.save();
        }

        // Save user cart update
        await user.save();

        res.json({ message: "Product removed from cart", shoppingCart: user.shoppingCart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ error: "Failed to remove product from cart" });
    }
});

// cartRoutes.post("/placeOrder", authenticate, async (req, res) => {
//     const { address_line, city, state, pincode } = req.body;

//     // Validate address fields
//     if (!address_line || !city || !state || !pincode) {
//         return res.status(400).json({ error: "All address fields are required" });
//     }
//     if (!/^\d{6}$/.test(pincode)) {
//         return res.status(400).json({ error: "Invalid pincode format. Must be 6 digits." });
//     }

//     try {
//         const user = await User.findById(req.user._id).populate("shoppingCart.prodId");

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         if (!user.shoppingCart.length) {
//             return res.status(400).json({ error: "Cart is empty" });
//         }

//         // Create order with provided address
//         const newOrder = new Order({
//             userId: user._id,
//             items: user.shoppingCart.map(({ prodId, quantity }) => ({
//                 productId: prodId._id,
//                 productName: prodId.productName,
//                 quantity,
//                 price: prodId.discountedPrice,
//             })),
//             totalAmount: user.shoppingCart.reduce((acc, { prodId, quantity }) => acc + prodId.discountedPrice * quantity, 0),
//             address: { address_line, city, state, pincode },
//             status: "Pending", // Default order status
//         });

//         await newOrder.save();

//         // Clear the cart after successful order
//         user.shoppingCart = [];
//         await user.save();

//         res.json({ message: "Order placed successfully!", orderId: newOrder._id });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ error: "Failed to place order" });
//     }
// });

cartRoutes.post("/placeOrder", authenticate, async (req, res) => {
    const { addressId, paymentMethod } = req.body;

    // Validate required fields
    if (!addressId || !paymentMethod) {
        return res.status(400).json({ error: "Address ID and payment method are required" });
    }

    try {
        const user = await User.findById(req.user._id).populate("shoppingCart.prodId");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.shoppingCart.length) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Fetch address details
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ error: "Address not found" });
        }

        // Create order with provided address and payment method
        const newOrder = new Order({
            userId: user._id,
            items: user.shoppingCart.map(({ prodId, quantity }) => ({
                productId: prodId._id,
                productName: prodId.productName,
                quantity,
                price: prodId.discountedPrice,
            })),
            totalAmount: user.shoppingCart.reduce((acc, { prodId, quantity }) => acc + prodId.discountedPrice * quantity, 0),
            address: {
                address_line: address.address_line,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
            },
            paymentMethod,
            status: "Pending", // Default order status
        });

        await newOrder.save();

        // Clear the cart after successful order
        user.shoppingCart = [];
        await user.save();

        res.json({ message: "Order placed successfully!", orderId: newOrder._id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order" });
    }
});
export { cartRoutes };

