import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users } from "../Models/user.js";
dotenv.config();


const userAuth = Router();
 
userAuth.post('/signUp',async(req,res)=>{
    try{
        const { UserRole,FullName,PhoneNo,Email,Password} = req.body;
        console.log(Name);
        const newPassword = await bcrypt.hash(Password,10);
        console.log(newPassword);
        const existinguser = await Users.findOne({email:Email})
        if(existinguser){
            res.status(401).send("User already exit");
        }
        else{
            const newuser = new Users({
                userRole:UserRole,
                fullname:FullName,
                phone:PhoneNo,
                email:Email,
                password:newPassword
            });
            await newuser.save();
            res.status(201).send("Signed-up successfully")
        }
    }catch(error){
        console.log(error)
        res.status(500).send("Internal Server error");
    }  
})

userAuth.post('/login',async(req,res)=>{
    try{
        const {Email,Password}=req.body;
        const result = await Users.findOne({email:Email});
        if(!result){
            res.status(400).send("Enter a valid user email");
        }
        else{
            console.log(result.password);
            const valid = await bcrypt.compare(Password,result.password);
            
            if(valid){
                const token = jwt.sign({Email:Email,UserRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'4h'});
                console.log(token);
                res.cookie('authToken',token,
                {
                    httpOnly:true
                });
                res.status(200).json({message:"Logged in successfully"});
                Users.last_login_date = Date.now();
                await Users.save();
                console.log(valid);
            }
            else{
                res.status(401).json({message:"Unauthorized access"});
            }
         }
    }
    catch{
        res.status(500).json({message:"Internal Server Error"})
    }
})


userAuth.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
    console.log("User logged out successfully");
    res.status(200).json({msg:"Successfully logged out"});
})

export {userAuth};

