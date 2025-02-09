import { Schema, model } from "mongoose";

const cartDetails = new Schema({
    productId: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    weight: { type: String, required: true },
    quantity: { type: String, required: true },
})
const cartSchema = model('cart', cartDetails);

export { cartSchema };