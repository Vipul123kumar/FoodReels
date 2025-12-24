const userModel = require("../models/user.modal");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
// const foodPartnerModel = require("../models/foodPartnerModal");
const foodPartnerModal =require('../models/foodPartner.modal')

// register controller 
async function registerUser(req,res)
{
    const {fullName,email,password}=req.body;
    const isUserAlreadyExists=await userModel.findOne({email})
    if(isUserAlreadyExists)
    {
        return res.status(400).json({
            message:"user already exists"
        })
    }
    //hash password using bcrypt js 
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })
    const token=jwt.sign({
        id:user._id
,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"user register sucess",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

async function loginUser(req,res) {
    const {email,password}=req.body;
    const isUserExist=await userModel.findOne({email});
    if(!isUserExist)
    {
       return res.status(404).json(
        {
            message:"Username or password invalid"
        })
    }
    const isPasswordvalid=await bcrypt.compare(password,isUserExist.password);
    if(!isPasswordvalid)
    {
        res.status(404).json({
            message:"Username or password invalid"
        })
    }
    const token=jwt.sign({
        id:isUserExist._id,

    },process.env.JWT_SECRET)
    res.cookie("token",token);
    res.status(200).json({
        message:"Login successfully done"
    })
    
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"Logout successful"
    });
}

async function registerFoodPartner(req,res)
{
   const {name,email,password,phone , address,contactName}=req.body;
   const isAccountAlreadyExist=await foodPartnerModal.findOne({email})
   if(isAccountAlreadyExist)
   {
    return res.status(400).json({
        message:"Food partner account already exists"
    })
   }
   const hashedPassword=await bcrypt.hash(password,10)
   const foodPartner= await foodPartnerModal.create({
    name,
    email,
    password:hashedPassword,
    phone,
    address,
    contactName
   })

   const token=jwt.sign({
    id:foodPartner._id,

   },process.env.JWT_SECRET)

   res.cookie("token",token)
   res.status(201).json({
    message:"Food partner register successfully",
    foodPartner:{
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name,
        address:foodPartner.address,
        contactName:foodPartner.contactName,
        phone:foodPartner.phone

    } 
   }) 
}

async function loginFoodPartner(req,res){
    const {email , password}=req.body;
    const foodPartner=await foodPartnerModal.findOne({email})
    if(!foodPartner)
    {
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid =await bcrypt.compare(password,foodPartner.password);
    if(!isPasswordValid)
    {
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
     
    const token=jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token);
    res.status(200).json({
        message:"Food partner Logged Successfully",
          partner: {
    _id: foodPartner._id,
    email: foodPartner.email,
    name: foodPartner.name,
  },

    })

}

 async function logoutFoodPartner(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message:"Logout Successfully"
    })    
 }

module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}