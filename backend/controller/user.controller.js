import User from '../models/user.model.js'

export const getcurrentuser = async(req,res) => { 
    try {
        const userId = req.userId;
       const user = await User.findById(userId)
       .populate('listing','title booking landMark image1 image2 image3 rent city _id description host ratings isBooked category')
       .populate('booking','title landMark image1 image2 image3 rent city _id description host ratings isBooked category booking')
       if(!user){
        return res.status(400).json({massege:"user does not exists"})
      }  
    return res.status(200).json(user)
    } catch (error) {
    return res.status(500).json({massege:`get current user error:${error}`})
        
    }  
 
 } 