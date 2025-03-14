import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/user.js";

dotenv.config();

const userAuth = Router();
const ADMIN_EMAILS = process.env.ADMIN_EMAIL.split(",");

userAuth.post("/register", async (req, res) => {
  try {
    const { Name, Email, PhoneNo, Password } = req.body;

    const existingUser = await User.findOne({ email: Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const userRole = ADMIN_EMAILS.includes(Email) ? "admin" : "user";

    const newUser = new User({
      fullName: Name,
      email: Email,
      phone: PhoneNo,
      password: hashedPassword,
      userRole,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", role: userRole });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

userAuth.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ email: Email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User Found:", user.email);

    const isValidPassword = await bcrypt.compare(Password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("Password Matched!");

    const token = jwt.sign(
      {  id: user._id, email: user.email, role: user.userRole },
      process.env.SECRET_KEY,
      { expiresIn: "4h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    user.lastLoginDate = new Date();
    await user.save();

    res.json({ message: "Logged in successfully", role: user.userRole ,token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// userAuth.post("/adminLogin", async (req, res) => {
//   try {
//       const { Email, Password } = req.body; 

//       console.log("Received Email:", Email); 
//       console.log("Admin List:", ADMIN_EMAILS); 
//       if (!mongoose.connection.readyState) {
//         console.log("MongoDB not connected! Attempting to reconnect...");
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//       }

//       if (!ADMIN_EMAILS.includes(Email)) {
//           return res.status(403).json({ message: "Access denied. Not an admin." });
//       }

//       const admin = await User.findOne({ email:Email , userRole:"admin" });
//       if (!admin) {
//           return res.status(401).json({ message: "Invalid credentials" });
//       }

//       console.log("Admin Found:", admin.email);  

//       const isValidPassword = await bcrypt.compare(Password, admin.password);
//       if (!isValidPassword) {
//           return res.status(401).json({ message: "Invalid credentials" });
//       }

//       console.log("Password Matched!");  

//       const token = jwt.sign(
//           { email: admin.email, userRole: "admin" },
//           process.env.SECRET_KEY,
//           { expiresIn: "4h" }
//       );

//       res.cookie("authToken", token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "strict",
//           path: "/",
//       });

//       res.status(200).json({ message: "Admin logged in successfully", role: admin.userRole });
//   } catch (error) {
//       console.error("Admin Login Error:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// });


userAuth.get("/logout", (req, res) => {
  res.clearCookie("authToken", {
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  console.log("User logged out successfully");
  res.status(200).json({ message: "Successfully logged out" });
});

export { userAuth };