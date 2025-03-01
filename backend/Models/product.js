import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true },
    image: [{ type: String }],
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    sub_categoryId: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
    unit: { type: String },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    more_details: { type: Object },
    publish: { type: Boolean, default: true }
},{ timestamps: true });

const Product = model('Products',productSchema);

export { Product };