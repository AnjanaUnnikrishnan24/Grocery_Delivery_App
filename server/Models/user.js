import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, index: true, lowercase: true },
  password: { type: String, required: true },
  avatar:{ type:String , default:"" },
  phone: { type: String, required: true, match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]},
  userRole: { type: String, enum: ["admin", "user"], default: "user" },
  addressDetails: [{type:Schema.Types.ObjectId,ref :"Address" }],
  lastLoginDate: { type: Date, default: Date.now },
  shopping_cart :[{type:Schema.Types.ObjectId,ref :"cart"}],
  orderHistory : [{type:Schema.Types.ObjectId,ref :"order"}]
},{timestamps:true})
const User = model('User', userSchema);

export default User;

