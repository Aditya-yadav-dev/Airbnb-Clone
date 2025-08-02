import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { genToken } from "../config/Token.js";

 

 export const signUp = async(req,res)=>{
        try {
            const {name, email, password} = req.body;
             const existuser = await User.findOne({email})

             if(existuser){
              return res.status(400).json({message:"User already exists"})
             }
             const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({
               name,
               email,
               password: hashedpassword
             })

             const token = genToken(user._id)
             res.cookie('token',token,{
              httpOnly:true,
              maxAge: 7*24*60*60*1000,
              sameSite: 'Strict',
              secure: process.env.NODE_ENV==='production'
             })

        return res.json(user)

        } catch (error) {
            
              return res.status(500).json({massege:`user signUp error ${error}`})
        }
 }

 export const login = async(req,res)=>{

       try {
              const {email,password} = req.body;
              const user = await User.findOne({email})
                .populate('listing','title booking landMark image1 image2 image3 rent city _id description host ratings isBooked category')
                .populate('booking','title landMark image1 image2 image3 rent city _id description host ratings isBooked category booking') 
              if(!user){
                     return res.status(400).json({massege:"user does not exist!"})
              }
              const isMatched = await bcrypt.compare(password,user.password);
              if(!isMatched){
                       return res.status(400).json({massege:"password Inccorect"})
              }
              const token = genToken(user._id)
            //   console.log('token in login is',token)
               res.cookie('token',token,{
              httpOnly:true,
              maxAge: 7*24*60*60*1000,
              sameSite: 'Strict',
              secure: process.env.NODE_ENV === 'production'

             })
       console.log('token in is ',res.cookies)
             return res.status(201).json(user)

       } catch (error) {
               return res.status(500).json({massege:`user login error ${error}`})
       }
 }

 export const logOut = (req,res)=>{
      try {
         res.clearCookie('token')
        return res.status(200).json({massege:"user logout succesfully"})
      } catch (error) {
        return res.status(500).json({massege:"user logout error"})
       
      }
 }