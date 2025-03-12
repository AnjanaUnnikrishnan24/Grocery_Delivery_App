const userCheck=(req,res,next)=>{
    if(req.role=='user'){
        next();
    }
    else{
        res.status(403).json({msg:"You are not allowed"})
    }
}

export default userCheck;