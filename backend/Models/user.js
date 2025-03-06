import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String ,required:true},
    last_login_date: { type: Date },
    addressDetails: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    shoppingCart: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    role: { type: String, enum: ["admin", "user"], default: "user" },
},{ timestamps: true });

const Users = model('User', userSchema);

export { Users };