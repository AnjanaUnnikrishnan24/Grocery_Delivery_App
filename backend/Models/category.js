import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    catName: { type: String, required: true, unique: true, trim: true },
    catImage: { type: String, trim: true },
}, { timestamps: true });

const Category = model("Category", categorySchema);

export default Category;
