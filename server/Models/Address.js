import { Schema, model } from 'mongoose';
const addressSchema = new Schema({
    address_line: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String,  required: true,  match: [/^\d{6}$/, "Invalid pincode format"],  trim: true},
    userId : {type:Schema.Types.ObjectId, ref :"User", required: true }
});

const Address = model("Address", addressSchema);

export default Address;