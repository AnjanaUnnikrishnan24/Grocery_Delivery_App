import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Users from "../Models/user.js"
import Order from "../Models/order.js";

const orderRoutes = Router();


orderRoutes.post("/checkout", authenticate, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).populate("shoppingCart.productId");

        if (!user || user.shoppingCart.length === 0) return res.status(400).json({ message: "Cart is empty!" });

        const subTotal = user.shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        res.status(200).json({ message: "Checkout successful!", subTotal });

    } catch (error) {
        console.error("Error at checkout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


orderRoutes.post("/order/place", authenticate, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).populate("shoppingCart.productId");

        if (!user || user.shoppingCart.length === 0) return res.status(400).json({ message: "Cart is empty!" });

        const { paymentType, deliveryAddress } = req.body;
        if (!paymentType || !deliveryAddress) return res.status(400).json({ message: "Payment method and address required!" });

        const order = new Order({
            userId: user._id,
            orderId: `ORD-${Date.now()}`,
            productDetails: user.shoppingCart,
            paymentType,
            deliveryAddress,
            subTotalAmt: user.shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            totalAmt: user.shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        });

        await order.save();
        user.shoppingCart = [];
        await user.save();

        res.status(201).json({ message: "Order placed successfully!", order });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


orderRoutes.get("/orders", authenticate, async (req, res) => {
    const orders = await Order.find({ userId: req.user.id }).populate("productDetails.productId");
    res.status(200).json({ orders });
});


orderRoutes.get("/ordersDetails", authenticate, async (req, res) => {
    const order = await Order.findOne({ orderId: req.params.orderId }).populate("productDetails.productId");
    if (!order) return res.status(404).json({ message: "Order not found!" });
    res.status(200).json(order);
});

export {orderRoutes} ;
