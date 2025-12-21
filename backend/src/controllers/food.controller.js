const foodModal = require('../models/food-modal');
const storageService = require('../services/storage.service');
const { v4: uuid } = require("uuid")


async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModal.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id

    })

    res.status(201).json({
        message:"food created sucessfully",
        food:foodItem 
    })
}

async function getFoodItems(req,res)
{
   const foodItems=await foodModal.find()
   res.status(200).json({
    message:"food item fetched successfully",
    foodItems
   })
}
module.exports = { createFood ,getFoodItems } 


