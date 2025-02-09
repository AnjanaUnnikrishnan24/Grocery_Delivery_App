import { Schema, model } from "mongoose";

// Product Schema
const pDetails = new Schema({
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    //Image: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: String, required: true },
    quantity: { type: Number, required: true },
    stockStatus: { type: String, enum: ["in stock", "out of stock"], required: true }
},{ timestamps: true });

const prodSchema = model('Products', pDetails);

export { prodSchema};
