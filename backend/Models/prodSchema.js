import { Schema, model } from "mongoose";

// Product Schema
const pDetails = new Schema({
    name: { type: String, required: true },
    pid: { type: String, required: true, unique: true },
    // Image: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    weight: { type: String, required: true },
    quantity: { type: String, required: true },
    stockStatus: { type: String, required: true }
});

const prodSchema = model('addProducts', pDetails);

// Order Schema
const orderDetails = new Schema({
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    dateOrdered: { type: Date, default: Date.now },
    items: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" }
});

const orderSchema = model('orders', orderDetails);

export { prodSchema, orderSchema };
