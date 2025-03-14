import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Order from "../Models/order.js";
import Cart from "../Models/cart.js";
 
const orderRoutes = Router();

// Checkout Route
orderRoutes.post("/checkout", authenticate, async (req, res) => {
    try {
        const userCart = await Cart.find({ userId: req.user.id }).populate("productId");

        if (!userCart.length) return res.status(400).json({ message: "Cart is empty!" });

        const subTotal = userCart.reduce((sum, item) => sum + item.productId.discountedPrice * item.quantity, 0);

        res.status(200).json({ message: "Checkout successful!", subTotal });

    } catch (error) {
        console.error("Error at checkout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Place Order Route
orderRoutes.post("/orderPlace", authenticate, async (req, res) => {
    try {
        const userCart = await Cart.find({ userId: req.user.id }).populate("productId");

        if (!userCart.length) return res.status(400).json({ message: "Cart is empty!" });

        const { paymentType, deliveryAddress } = req.body;
        if (!paymentType || !deliveryAddress) return res.status(400).json({ message: "Payment method and address required!" });

        const productDetails = userCart.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity
        }));

        const subTotal = userCart.reduce((sum, item) => sum + item.productId.discountedPrice * item.quantity, 0);

        const order = new Order({
            userId: req.user.id,
            productDetails,
            paymentType,
            deliveryAddress,
            subTotalAmt: subTotal,
            totalAmt: subTotal 
        });

        await order.save();
        await Cart.deleteMany({ userId: req.user.id });

        res.status(201).json({ message: "Order placed successfully!", order });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get All Orders for User
orderRoutes.get("/orders", authenticate, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate("productDetails.productId");

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get Order Details by Order ID
orderRoutes.get("/ordersDetails/:orderId", authenticate, async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId }).populate("productDetails.productId");
        
        if (!order) return res.status(404).json({ message: "Order not found!" });

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export { orderRoutes };

