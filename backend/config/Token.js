import jwt from 'jsonwebtoken';

   export const genToken = (userId)=>{
    try {
        if(!userId){
        return
    }
       const token = jwt.sign({userId},process.env.JWT_SECRETE, {expiresIn:'7d'})
       return token
    } catch (error) {
        console.log(error)
    }
   }

