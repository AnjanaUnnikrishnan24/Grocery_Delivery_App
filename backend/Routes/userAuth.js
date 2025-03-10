import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../Models/user.js";

dotenv.config();

const userAuth = Router();

userAuth.post("/signUp", async (req, res) => {
    try {
        const { FullName, PhoneNo, Email, Password } = req.body;

        const existingUser = await Users.findOne({ email:Email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const isAdmin = Email === process.env.ADMIN_EMAIL;

        const newUser = new Users({
            fullName: FullName,
            phone: PhoneNo,
            email:Email,
            password: hashedPassword,
            userRole: isAdmin ? "admin" : "user",
            lastLoginDate: null,
        });

        await newUser.save();
        res.status(201).send(isAdmin ? "Admin signed up successfully" : "User signed up successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userAuth.post("/login", async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await Users.findOne({ email:Email });
        if (!user) {
            return res.status(400).send("User not registered. Please sign up.");
        }

        const isValidPassword = await bcrypt.compare(Password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const token = jwt.sign(
            { email: user.email, userRole: user.userRole },
            process.env.SECRET_KEY,
            { expiresIn: "4h" }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            path:"/"
        });

        user.lastLoginDate = new Date();
        await user.save();

        res.status(200).json({ message: "Logged in successfully", role: user.userRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userAuth.get("/logout", (req, res) => {
    res.clearCookie("authToken", {
        path: "/",
        secure: process.env.NODE_ENV === "production", // Security improvement
    });
    console.log("User logged out successfully");
    res.status(200).json({ message: "Successfully logged out" });
});

export { userAuth };

