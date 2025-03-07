import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
    subCatName: { type: String, required: true, trim: true }
});

// Category Schema
const categorySchema = new Schema({
    catName: { type: String, required: true, unique: true, trim: true },
    catImage: { type: String, trim: true },
    subCategories: [subCategorySchema] 
}, { timestamps: true });

const Category = model("Category", categorySchema);

export default Category;
