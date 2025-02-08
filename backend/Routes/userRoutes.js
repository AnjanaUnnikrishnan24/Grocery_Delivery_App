import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import { prodSchema, orderSchema } from "../Models/prodSchema.js";
import { userSchema } from "../Models/userSchema";

const userRoutes = Router();

userRoutes.post('/addAddress',authenticate,userCheck, async(req,res)=>{
    try {
        const { street, city, state, zip } = req.body;
        const user = await userSchema.findById(req.user.id);

        user.addresses.push({ street, city, state, zip });
        await user.save();

        res.status(201).json({ message: "Address added successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRoutes.post('/placeOrder',authenticate,userCheck, async(req,res)=>{
    try {
        const user = await userSchema.findById(req.user.id);
        if (user.cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

        const newOrder = new Order({
            orderId: `ORD-${Date.now()}`,
            customerId: user._id,
            customerName: user.name,
            customerEmail: user.email,
            items: user.cart,
            totalAmount: user.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            deliveryDate: new Date(Date.now())
        });

        await newOrder.save();
        user.cart = [];
        await user.save();

        res.status(201).json({ message: "Order placed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRoutes.get('/viewCart',authenticate,userCheck, async(req,res)=>{
    try {
        const user = await userSchema.findById(req.user.id);
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRoutes.get('/catalog', authenticate, async (req, res) => {
    try {
        const products = await prodSchema.find({}, 'name weight price');

        if (products.length === 0) {
            return res.status(404).json({ message: "No products available" });
        }

        res.status(200).json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRoutes.get('/orderHistory',authenticate,userCheck, async(req,res)=>{
    try {
        const orders = await orderSchema.find({ customerId: req.user.id }).populate('customerId', 'name email');

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export {userRoutes}