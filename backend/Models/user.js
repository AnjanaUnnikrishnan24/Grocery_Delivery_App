import { Schema, model } from 'mongoose';

const userDetail = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    mobile: { type: String },
    last_login_date: { type: Date },
    addressDetails: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    shoppingCart: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
},{ timestamps: true });

const UserSchema = model('User', userDetail);

export { UserSchema };