import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import upload from "../Middleware/upload.js";
import Category from "../Models/category.js";

const categoryRoutes = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};


categoryRoutes.post("/addCategory", authenticate, adminCheck, upload.single("image"), async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required!" });
        }

        const existingCategory = await Category.findOne({ catName:name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists!" });
        }

        let imageBase64 = null;
        if (req.file) {
            imageBase64 = convertToBase64(req.file.buffer);
        }

        const newCategory = new Category({
            catName: name,
            catImage: imageBase64
        });

        await newCategory.save();
        res.status(201).json({ message: "Category added successfully!" });

    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


categoryRoutes.delete("/deleteCategory", authenticate, adminCheck, async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found!" });
        }

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ message: "Category deleted successfully!" });

    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

categoryRoutes.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found!" });
        }

        res.json(categories);

    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



export { categoryRoutes };
