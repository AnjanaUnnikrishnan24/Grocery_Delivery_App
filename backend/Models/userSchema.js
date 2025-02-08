import { Schema, model } from 'mongoose';

const addresses = new Schema({
    houseName:{ type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
});

const cartItem = new Schema({
    productId: { type: String, required: true ,unique: true},
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const userDetail = new Schema({
    userRole: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [addresses],  
    cart: [cartItem],      
});

const UserSchema = model('User', userDetail);

export { UserSchema };
