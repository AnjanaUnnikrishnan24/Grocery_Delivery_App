import express,{json} from 'express';
import dotenv from 'dotenv';
import { userAuth } from './Routes/userAuth.js';
import adminAuth from './Routes/adminAuth.js';

dotenv.config();

const app = express();

app.use(json());

app.use('/',userAuth);
app.use('/',adminAuth);

app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
})