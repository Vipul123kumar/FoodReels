const mongoose=require('mongoose');


function connectDB()
{
    mongoose.connect(process.env.DB_URL)
    .then(()=>
    {
        console.log("mongodb connected");
        
    })
     .catch((error) => {
       console.log(process.env.DB_URL);
      console.log("MongoDB connection failed:", error.message);
    });
}

module.exports=connectDB;