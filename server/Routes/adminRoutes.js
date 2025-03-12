import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import Product from "../Models/product.js";
import Order from "../Models/order.js";

const adminRoutes = Router();

adminRoutes.get("inventory", authenticate, adminCheck, async (req, res) => {
    try {
        const products = await Product.find().select("productName category brand mrp discountPercent discountedPrice stockQty productImage");
        
        if (!products.length) {
            return res.status(404).json({ message: "No products found in inventory!" });
        }

        res.status(200).json({ inventory: products });
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

 
adminRoutes.get("/orders", authenticate, adminCheck, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId", "fullName email")
            .populate("productDetails.productId", "productName brand")
            .populate("deliveryAddress", "address_line city state pincode country")
            .select("orderId userId productDetails subTotalAmt totalAmt paymentType deliveryStatus orderDate");

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found!" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

adminRoutes.get("/ordersDetails", authenticate, adminCheck, async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({ orderId })
            .populate("userId", "fullName email phone")
            .populate("productDetails.productId", "productName brand mrp discountedPrice")
            .populate("deliveryAddress", "address_line city state pincode country")
            .select("orderId userId productDetails subTotalAmt totalAmt paymentType deliveryStatus orderDate");

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

adminRoutes.put("/updateStatus", authenticate, adminCheck, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { newStatus } = req.body;

         const validStatuses = ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered"];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({ message: "Invalid order status!" });
        }

        const order = await Order.findOneAndUpdate(
            { orderId },
            { deliveryStatus: newStatus },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        res.status(200).json({ message: "Order status updated successfully!", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export { adminRoutes }

