import { Schema, model } from "mongoose";

// Product Schema
const pDetails = new Schema({
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    //Image: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    weight: { type: String, required: true },
    quantity: { type: String, required: true },
    stockStatus: { type: String, required: true }
});

const prodSchema = model('addProducts', pDetails);

export { prodSchema};
