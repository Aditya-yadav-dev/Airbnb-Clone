import jwt from 'jsonwebtoken'

 const isAuth = async(req,res,next)=>{
     try {

        const {token} = req.cookies;
      // console.log('token in isAuth',token)
     if(!token){
       return res.status(400).json({massege:"token not found"})
     }
     
    const verifiedToken =  jwt.verify(token, process.env.JWT_SECRETE)
      // console.log('verified token is in auth',verifiedToken)

    if(!verifiedToken){
       return res.status(400).json({massege:"user does not have a valid token"})
    }
    req.userId = verifiedToken.userId;
    next();
     } catch (error) {
       return res.status(500).json({massege:`errors during token verification`})
        
     }
 }

 export default isAuth;