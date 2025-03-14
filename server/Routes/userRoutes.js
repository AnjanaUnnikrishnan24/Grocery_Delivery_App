import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import Address from "../Models/Address.js";

const userRoutes = Router();

userRoutes.get("/address", authenticate,userCheck, async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user._id });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error });
    }
});
 
userRoutes.post("/addAddress", authenticate, async (req, res) => {
    try {
        const { address_line, city, state, pincode } = req.body;
        
        const newAddress = new Address({
            address_line,
            city,
            state,
            pincode,
            userId: req.user._id
        });

        await newAddress.save();

        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error });
    }
});
 

export {userRoutes}