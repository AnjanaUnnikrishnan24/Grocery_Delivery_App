import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const addressSchema = new Schema({
    address_line: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { 
      type: String,  
      required: true,  
      match: [/^\d{6}$/, "Invalid pincode format"],  
      trim: true 
    },
    country: { type: String, required: true, trim: true }
}, { _id: false });

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, index: true, lowercase: true },
  password: { type: String, required: true },
  phone: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"] 
  },
  userRole: { type: String, enum: ["admin", "user"], default: "user" },
  lastLoginDate: { type: Date, default: Date.now },
  addresses: [addressSchema],
  shoppingCart: [cartItemSchema],
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }]
}, { timestamps: true });

const Users = model('User', userSchema);

export default Users;
