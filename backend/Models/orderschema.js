import { Schema, model } from 'mongoose';

const orderDetails = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    checkoutDetails: { type: Schema.Types.ObjectId, ref: 'checkout', required: true }, 
    products: [{ type: Schema.Types.ObjectId, ref: 'cart', required: true }],  
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
    totalAmount: { type: Number, required: true },  
});

const orderSchema = model('Order', orderDetails);
export { orderSchema };
