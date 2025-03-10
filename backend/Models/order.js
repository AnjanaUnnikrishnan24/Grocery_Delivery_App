import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: String, required: true, unique: true },
  productDetails: [orderItemSchema],
  paymentType: { type: String, enum: ["COD", "UPI"], required: true },
  deliveryAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
  deliveryStatus: { 
    type: String, 
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending", 
    required: true 
  },
  subTotalAmt: { type: Number, required: true, min: 0 },
  totalAmt: { type: Number, required: true, min: 0 },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = model("Order", orderSchema);

export default Order ;


