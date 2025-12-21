const express=require('express')
const foodPartnerController=require("../controllers/food-partner.controller");
const  authUserMiddleware  = require('../middleWares/auth.middleware');

const router=express.Router();

router.get("/:id",
     authUserMiddleware.authUserMiddleware,
     foodPartnerController.getFoodPartnerById
    
    
)
module.exports=router;  