import mongoose, { Mongoose }  from "mongoose";
const connectdb = async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log('DB connected succesfully')
    } catch (error) {
        console.log('DB connection faild')
    }
}

export default connectdb;