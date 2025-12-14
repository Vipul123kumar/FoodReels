// yaha pe services me isliye rakh rahe hai q ki isko aage ham change bhi kar sakte hai agar koe dusra storage use karna chahe 
const ImageKit=require("imagekit")
require("dotenv").config();
const imagekit=new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGE_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGE_URL_ENDPOINT


});

async function uploadFile(file,fileName)
{
    const result=await imagekit.upload({
        file:file,   //important hai or isme buffer aayega go hame video upload karne pr mil raha tha 
        fileName:fileName,  // important hai 
    })

    return result;
}
module.exports={uploadFile}