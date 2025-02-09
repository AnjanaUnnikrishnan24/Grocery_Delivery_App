import { Schema, model } from "mongoose";

const checkoutDetails = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name:{ type: String, required: true },
    address:{ type: String, required: true },
    location:{ type: String, required: true },
    contactnumber:{ type: String, required: true }  
}, { timestamps: true })
const checkoutSchema = model('checkout', checkoutDetails);

export { checkoutSchema };