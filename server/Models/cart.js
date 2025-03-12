import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
    userId : {type:Schema.Types.ObjectId, ref :"User", required: true },
    productId : { type:Schema.Types.ObjectId, ref :"Product", required: true  },
    quantity : { type :Number, default : 1 }
  
},{timestamps:true});

const Cart = model('Cart', CartSchema);

export default Cart;