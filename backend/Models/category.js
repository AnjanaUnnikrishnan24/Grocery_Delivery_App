import { Schema, model } from 'mongoose';

// Category Schema

const categorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String }
}, { timestamps: true });

const Category = model("Category", categorySchema);

// Sub Category Schema

const subCategorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }]
}, { timestamps: true });

const SubCategory = model("SubCategory", subCategorySchema);

export { Category , SubCategory };
