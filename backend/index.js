import express,{json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userAuth } from './Routes/userAuth.js';
import {adminRoutes} from './Routes/adminRoutes.js';
import { userRoutes } from './Routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(json());

app.use('/',userAuth);
app.use('/',adminRoutes);
app.use('/',userRoutes);

mongoose.connect('mongodb://localhost:27017/GROCERY').then(()=>{
    console.log("Mongodb connected Successfully to Grocery Website");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
})


app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
})