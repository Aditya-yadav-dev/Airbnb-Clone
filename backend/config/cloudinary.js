import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
async function uploadonCloudunary(filepath) {
    try {
        cloudinary.config({ 
        cloud_name: process.env.CLOUDE_NAME, 
        api_key: process.env.CLOUDE_API_KEY, 
        api_secret: process.env.CLOUDE_API_SECRETE
    });
    if(!filepath){
        return null
    }
     const uploadResult = await cloudinary.uploader.upload(filepath)
    console.log(uploadResult);
    fs.unlinkSync(filepath)
    return uploadResult.secure_url;
} catch (error) { 
        fs.unlinkSync(filepath)
         console.log(error);
    }
}

export default uploadonCloudunary;