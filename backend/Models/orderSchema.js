import { Schema, model } from "mongoose";

const orderItem = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderDetails = new Schema({
    orderId: { type: String, required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: [orderItem], 
    totalAmount: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    dateOrdered: { type: Date, default: Date.now }
})
const orderSchema = model('Orders', orderDetails);

export { orderSchema };
