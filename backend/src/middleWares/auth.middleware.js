const foodPartnerModal=require('../models/foodPartner.modal')
const  jwt=require("jsonwebtoken");
const userModel = require('../models/user.modal');
async function authFoodPartnerMiddleware(req,res,next)
{
    const token=req.cookies.token;
    if(!token)
    {
        res.status(401).json({
            message:"unauthorized access"
        })
    }
    try{
        // check karo token 
       const decoded= jwt.verify(token,process.env.JWT_SECRET)
       const foodPartner=await foodPartnerModal.findById(decoded.id);
       // here creating a new property in req foodPartner and 
       req.foodPartner=foodPartner
       next()
    }
    catch(err)
    {
         return res.status(401).json({
            message:"Invalid token"
         })
    }
}

async function authUserMiddleware(req,res,next) {
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({
            message:"Please Login first"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decoded.id);
        req.user=user
        next()
    } catch(err)
    {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}


module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware
}


