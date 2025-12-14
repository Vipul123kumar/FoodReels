const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({

    fullName:{
        type:String,
        require:true
    },
    email:{
          type:String,
          require:true,
          unique:true
    },
    password:{
        type:String,

    }
},
//tiemstamp keep details of time when use creaed 
{
    timestamps:true
}

)

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;