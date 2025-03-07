import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    productName: { type: String, required: true, trim: true },
    productId: { type: Number, required: true, unique: true },

    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "Category.subCategories", required: true },

    dietaryType: { 
        type: String, 
        enum: ['Veg', 'Non-Veg', 'Vegan'], 
        required: true 
    },
    brand: { type: String, required: true, trim: true },

    mrp: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, required: true, min: 0, max: 100 },

    discountedPrice: { type: Number, required: true },  

    weight: { 
        value: { type: Number, required: true, min: 0 }, 
        unit: { type: String, enum: ['g', 'kg', 'ml', 'l', 'pcs', 'pack'], required: true } 
    },  

    stockQty: { type: Number, required: true, min: 0 },
    productImage: { type: String, required: true, trim: true } 

}, { timestamps: true });

productSchema.pre("save", function(next) {
    this.discountedPrice = this.mrp - (this.mrp * this.discountPercent / 100);
    next();
});

const Product = model('Product', productSchema);

export { Product };
