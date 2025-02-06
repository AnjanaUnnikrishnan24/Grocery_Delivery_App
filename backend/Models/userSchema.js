import { Schema } from "mongoose";
import { model } from "mongoose";

const signup = new Schema({
    user:{type:String,require:true},
    name:{type:String,require:true},
    phone:{type:String,require:true,unique:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true}
})

const userSchema = model ('userdetails',signup);
export {userSchema}