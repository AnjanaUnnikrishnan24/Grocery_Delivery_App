import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import Address from "../Models/Address.js";
import User from "../Models/user.js";
import mongoose from "mongoose";

const userRoutes = Router();

userRoutes.get("/addresses", authenticate, async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user._id });
        res.json({ addresses });
      } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error: error.message });
      }
});
 
userRoutes.post("/addAddress", authenticate, async (req, res) => {
    try {
        const { address_line, city, state, pincode } = req.body;
    
        if (!address_line || !city || !state || !pincode) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        const newAddress = new Address({
          address_line,
          city,
          state,
          pincode,
          userId: req.user._id,
        });
    
        await newAddress.save();
        res.json(newAddress);
      } catch (error) {
        res.status(500).json({ message: "Error adding address", error: error.message });
      }
});

    userRoutes.get('/users/:_id', async (req, res) => {
        try {
            const { _id } = req.params;
            console.log("User _id:", _id);
    
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return res.status(400).json({ message: "Invalid user _id" });
            }
    
            const user = await User.findById(_id)
                .select('fullName email phone')
                .populate('addressDetails'); 
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user information", error: error.message });
        }
    });
 

export {userRoutes}