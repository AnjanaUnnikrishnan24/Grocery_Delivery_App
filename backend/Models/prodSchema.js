import {Schema} from "mongoose";
import {model}  from "mongoose";

const pDetails = new Schema({
    name:{type:String,require:true},
    pid:{type:String,require:true,unique:true},
    Image:{type:String,require:true},
    category:{type:String,require:true},
    brand:{type:String,require:true},
    type:{type:String,require:true},
    price:{type:String,require:true},
    weight:{type:String,require:true},
    quantity:{type:String,require:true}
});

const prodSchema = model('addProducts',pDetails);
export {prodSchema}