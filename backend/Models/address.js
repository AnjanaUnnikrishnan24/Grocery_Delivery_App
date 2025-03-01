import { Schema,model} from 'mongoose';

const addressDetails = new Schema({
    address_line: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
    mobile: { type: String, required: true }
},{timestamps:true});

const addressSchema = model('Address',addressDetails);

export { addressSchema };

