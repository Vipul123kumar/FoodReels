const foodModal = require('../models/food-modal');
const foodPartnerModal=require('../models/foodPartner.modal')

async function getFoodPartnerById(req,res) {
    const foodPartnerId=req.params.id;
    const foodPartner=await foodPartnerModal.findById(foodPartnerId)
    const foodItemsByFoodPartner=await foodModal.find({foodPartner:foodPartnerId})
    if(!foodPartner)
    {
        return res.status(404).json({message:"food partner not found"});

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