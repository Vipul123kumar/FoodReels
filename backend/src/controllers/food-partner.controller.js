// const foodModal = require('../models/food-modal');
// const foodPartnerModal=require('../models/foodPartner.modal')

// async function getFoodPartnerById(req,res,next) {
//     // const foodPartnerId=req.params.id;
//     const foodPartnerId = req.params.id; 
//     const foodPartner=await foodPartnerModal.findById({foodPartnerId})
//     const foodItemsByFoodPartner=await foodModal.find({foodPartner:foodPartnerId})
//     console.log("backend",foodPartnerId);
//     console.log("partner",foodPartner);
//     console.log("food",foodItemsByFoodPartner);
    
    
//     if(!foodPartner)
//     {
//         return res.status(404).json({message:"food partner not found backend"});
          
//     }
//     res.status(200).json({
//         message:"food Partner retrived sucess",
//         foodPartner:{
//             ...foodPartner.toObject(),
//             foodItems:foodItemsByFoodPartner
//         }

//     });

    
// }
// module.exports={getFoodPartnerById}


const foodModal = require('../models/food-modal');
const foodPartnerModal = require('../models/foodPartner.modal');
const mongoose = require('mongoose');

async function getFoodPartnerById(req, res, next) {
  try {
    const foodPartnerId = req.params.id;

    console.log("backend id:", foodPartnerId, typeof foodPartnerId);

    // ✅ Validate ObjectId (prevents 500 errors)
    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
      return res.status(400).json({ message: "Invalid food partner ID" });
    }

    const foodPartner = await foodPartnerModal.findById(foodPartnerId);
    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    const foodItemsByFoodPartner = await foodModal.find({
      foodPartner: foodPartnerId,
    });

    res.status(200).json({
      message: "Food Partner retrieved successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = { getFoodPartnerById };
