import { Schema, model } from 'mongoose';

const userDetail = new Schema({
    userRole: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
});

const UserSchema = model('User', userDetail);

export { UserSchema };
