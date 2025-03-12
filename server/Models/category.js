import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    catName: { type: String, required: true, unique: true, trim: true },
    catImage: { type: String },
    subCategory : [{ 
        sName:{ type:String } ,
        sImage:{ type: String }
    }]
}, { timestamps: true });

const Category = model("Category", categorySchema);

export default Category;
