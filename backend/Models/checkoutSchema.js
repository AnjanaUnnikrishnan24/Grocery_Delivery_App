import { Schema, model } from "mongoose";

const checkoutDetails = new Schema({
    name:{ type: String, required: true },
    address:{ type: String, required: true },
    location:{ type: String, required: true },
    contactnumber:{ type: Number, required: true }
    
})
const checkoutSchema = model('checkout', checkoutDetails);

export { checkoutSchema };