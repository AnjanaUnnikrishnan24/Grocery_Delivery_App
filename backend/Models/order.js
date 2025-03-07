import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true, unique: true },
    product_details: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    payment_type: { type: String, enum: ["COD","UPI"], required: true },
    delivery_address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    delivery_status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending", required: true },
    subTotalAmt: { type: Number, required: true },
    totalAmt: { type: Number, required: true },
    order_date: { type: Date, default: Date.now } 
}, { timestamps: true });

const Order = model("Order", orderSchema);

export { Order };

