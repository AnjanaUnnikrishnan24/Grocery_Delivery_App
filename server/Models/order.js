// import { Schema, model } from 'mongoose';

// const orderSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   orderId: { type: String, required: true, unique: true },
//   productDetails: [{type: Schema.Types.ObjectId, ref: "Product", required: true} ],
//   paymentType: { type: String, enum: ["COD", "UPI"], required: true },
//   deliveryAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
//   deliveryStatus: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending", required: true},
//   subTotalAmt: { type: Number, required: true, min: 0 },
//   totalAmt: { type: Number, required: true, min: 0 },
//   orderDate: { type: Date, default: Date.now }
// }, { timestamps: true });

// orderSchema.pre("save", async function(next) {
//   if (!this.orderId) {
//       this.orderId = "ORD-" + Date.now();
//   }
//   next();
// });
// const Order = model("Order", orderSchema);

// export default Order ;


import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        prodId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "Debit Card", "UPI", "Net Banking"],
      required: true,
    },
    address: {
      address_line: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
