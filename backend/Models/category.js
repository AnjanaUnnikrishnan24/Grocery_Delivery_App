import { Schema, model } from 'mongoose';

// Category Schema

const categorySchema = new Schema({
    catName: { type: String, required: true },
    CatImage: { type: String }
}, { timestamps: true });

const Category = model("Category", categorySchema);

// Sub Category Schema

const subCategorySchema = new Schema({
    subname: { type: String, required: true },
    subimage: { type: String },
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }]
}, { timestamps: true });

const SubCategory = model("SubCategory", subCategorySchema);

export { Category , SubCategory };