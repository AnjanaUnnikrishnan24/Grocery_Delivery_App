import { Schema, model } from 'mongoose';

const productSchema = new Schema ({
    productName: { type: String, required: true },
    productId: { type: Number, required: true, unique: true },
    category: { type: String, required: true  },
    subCategory: { type: String, required: true  },
    dietaryType: { 
        type: String, 
        enum: ['Veg', 'Non-Veg', 'Vegan'], 
        required: true 
    },
    brand: { type: String, required: true },
    mrp: { type: Number, required: true },
    discountPercent: { type: Number, required: true, min: 0, max: 100 },
    discountedPrice: { 
        type: Number, 
        required: true, 
        default: function() { 
            return this.mrp - (this.mrp * this.discountPercent / 100); 
        }
    },
    weight: { type: String, required: true ,enum:['g','kg','ml','l','pcs','pack']},  
    stockQty: { type: Number, required: true, min: 0 },
    productImage: { type: String, required: true } 
}, { timestamps: true });

const Product = model('Products', productSchema);

export { Product };



