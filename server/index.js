import express,{json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import { userAuth } from './Routes/userAuth.js';
import { adminRoutes } from './Routes/adminRoutes.js';
import { userRoutes } from './Routes/userRoutes.js';
import { cartRoutes } from './Routes/cartRoutes.js';
import { productRoutes } from './Routes/productRoutes.js';
import { categoryRoutes } from './Routes/categoryRoutes.js';
import { orderRoutes } from './Routes/orderRoutes.js';


dotenv.config();

const app = express();

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json());

app.use('/',userAuth);
app.use('/',adminRoutes);
app.use('/',userRoutes);
app.use('/',cartRoutes);
app.use('/',productRoutes);
app.use('/',categoryRoutes);
app.use('/',orderRoutes);



mongoose.connect('mongodb://localhost:27017/GROCERY').then(()=>{
    console.log("Mongodb connected Successfully to Grocery Website");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
})


app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
})