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
  shoppingCart :[{
    prodId : { type: String, required: true },
    quantity :  { type: Number, required: true }
  }],
},{timestamps:true})
const User = model('User', userSchema);

export default User;

