import { Schema, model } from 'mongoose';

const cartProductSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Cart = model("CartProduct", cartProductSchema);

export { Cart }