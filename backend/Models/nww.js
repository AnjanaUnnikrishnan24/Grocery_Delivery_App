const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Fruits", "Vegetables", "Dairy", "Beverages", "Snacks", "Bakery", "Frozen Foods", "Meat", "Seafood", "Pantry Staples"],
  },
  brand: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // Percentage discount
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityOptions: [
    {
      unit: { type: String, enum: ["g", "kg", "ml", "L", "pcs", "pack"], required: true },
      value: { type: Number, required: true },
    },
  ],
  expiryDate: {
    type: Date, // For perishable items
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number, // in grams
    fat: Number, // in grams
    carbohydrates: Number, // in grams
  },
  dietaryLabels: [String], // e.g., ["Vegan", "Organic", "Gluten-Free"]
  countryOfOrigin: {
    type: String,
  },
  storageInstructions: {
    type: String, // e.g., "Keep Refrigerated"
  },
  usageInstructions: {
    type: String, // e.g., "Rinse before use"
  },
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String },
    },
  ],
  ratings: {
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  estimatedDeliveryTime: {
    type: String, // e.g., "2-3 days"
  },
  returnPolicy: {
    type: String, // e.g., "Returns accepted within 7 days"
  },
  subscriptionAvailable: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
