import { Schema, model } from "mongoose";

const cartDetails = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId:  { type: Schema.Types.ObjectId, ref: "Products", required: true },
    price: { type: Number, required: true },
    weight: { type: String, required: true },
    quantity: { type: Number, required: true },
})
const cartSchema = model('cart', cartDetails);

export { cartSchema };