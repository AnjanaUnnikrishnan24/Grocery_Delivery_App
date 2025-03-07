import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
    address_line: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String,  required: true,  match: [/^\d{5,10}$/, "Invalid pincode format"],  trim: true },
    country: { type: String, required: true, trim: true }
}, { timestamps: true });

const Address = model('Address', addressSchema);

export { Address };

