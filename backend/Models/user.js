import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    phone: { type: String,required: true,match: [/^\d{10}$/, "Phone number must be exactly 10 digits"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    last_login_date: { type: Date, default: Date.now  },
    addressDetails: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    shoppingCart: [{ 
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }]
}, { timestamps: true });

const Users = model('User', userSchema);

export { Users };