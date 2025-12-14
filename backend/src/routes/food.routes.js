const express=require('express');
const foodController=require('../controllers/food.controller')
const authMiddleware=require('../middleWares/auth.middleware')
const router=express.Router();
const multer=require('multer')
const upload=multer({
    storage:multer.memoryStorage(),

})
//Post api/food/ [protected]
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood)

router.get("/",authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)
module.exports=router;