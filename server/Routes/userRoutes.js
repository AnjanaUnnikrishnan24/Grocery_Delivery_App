import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Address from "../Models/Address.js";

const userRoutes = Router();

userRoutes.get("/addresses", authenticate, async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user._id });
        if (!addresses.length) return res.status(404).json({ error: "No addresses found" });

        res.json({ addresses });
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ error: "Failed to fetch addresses" });
    }
});
 
userRoutes.post("/addAddress", authenticate, async (req, res) => {
    const { address_line, city, state, pincode } = req.body;
    
    if (!address_line || !city || !state || !pincode) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
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
        console.error("Error adding address:", error);
        res.status(500).json({ error: "Failed to add address" });
    }
});
 

export {userRoutes}