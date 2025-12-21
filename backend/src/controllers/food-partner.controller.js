const foodModal = require('../models/food-modal');
const foodPartnerModal=require('../models/foodPartner.modal')

async function getFoodPartnerById(req,res,next) {
    const foodPartnerId=req.params.id;
    const foodPartner=await foodPartnerModal.findById({_id:foodPartnerId})
    const foodItemsByFoodPartner=await foodModal.find({foodPartner:foodPartnerId})
    console.log("backend",foodPartnerId);
    console.log("partner",foodPartner);
    console.log("food",foodItemsByFoodPartner);
    
    
    if(!foodPartner)
    {
        return res.status(404).json({message:"food partner not found backend"});
          
    }
    res.status(200).json({
        message:"food Partner retrived sucess",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodPartner
        }

    });

    
}
module.exports={getFoodPartnerById}