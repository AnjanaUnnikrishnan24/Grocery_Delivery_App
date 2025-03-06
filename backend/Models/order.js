import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true, unique: true },
    product_details: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
    payment_type: { type: String, required: true },
    delivery_address: { type: Schema.Types.ObjectId, ref: "Address" },
    delivery_status: { type: String, required: true },
    subTotalAmt: { type: Number, required: true },
    totalAmt: { type: Number, required: true },
    invoice_receipt: { type: String }
}, { timestamps: true });

const Order = model("Order", orderSchema);

export { Order }
