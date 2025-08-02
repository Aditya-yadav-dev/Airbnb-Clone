import uploadonCloudunary from "../config/cloudinary.js";
import path from 'path';
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { json } from "stream/consumers";
import { title } from "process";

export const addlisting= async(req,res) =>{
    try {
        let host = req.userId;
        const {title,description,landMark,city,category,rent} = req.body;
        let image1 = await uploadonCloudunary(req.files.image1[0].path)
        let image2 = await uploadonCloudunary(req.files.image2[0].path)
        let image3 = await uploadonCloudunary(req.files.image3[0].path)
        const listing = await Listing.create(
            {
              title,
              description,
              landMark,
              city,
              category,
              rent,
              host,
              image1,
              image2,
              image3
            }
        )
      
        const user = await User.findByIdAndUpdate(host,{$push:{listing:listing._id}},{new:true});
        console.log('this key is after images')
 
        if(!user){
            return res.status(400).json({massege:"user does not exist!"})
        }

       return res.status(201).json(listing);
 
    } catch (error) {
     return res.status(500).json({massege:`add listing error ${error}`});
    }
}
export const getListing=async(req,res) => { 
    try {
        
        let listing = await Listing.find().sort({createdAt:-1})
        return res.status(200).json(listing)
        
    } catch (error) {
        return res.status(500).json({massege:"get listing error"})
    }
 }
 export const findListing = async(req,res) => { 
    try {
        let {id} = req.params;
        let listing = await Listing.findById(id)
        if (!listing){
            return res.status(404).json({massege:'Listing does not found'})
        }
      return res.status(200).json(listing)
    } catch (error) {
        return res.status(500).json ({massege:`finding Listing error ${error}`})
    }
  }
 export const updateListing = async(req,res) => { 
    try {
        let image1, image2,image3;
        let {id} = req.params;
        const {title,description,landMark,city,rent} = req.body;
        if(req.files.image1){
            image1 = await uploadonCloudunary(req.files.image1[0].path)
        } 
     if(req.files.image2){
         image2 = await uploadonCloudunary(req.files.image2[0].path) 
     }
      if(req.files.image3){
          image3 = await uploadonCloudunary(req.files.image3[0].path)
      }
        const listing = await Listing.findByIdAndUpdate(id,
            {
              title,
              description,
              landMark,
              city,
              rent,
              image1,
              image2,
              image3
            },
            {new:true}
        )
       return res.status(201).json(listing);

    } catch (error) {
     return res.status(500).json({massege:`Update listing error ${error}`});
    }
   }
 export const deleteListing = async (req,res) => {
        try {
            const {id} = req.params;
            const listing = await Listing.findByIdAndDelete(id);
            const user = await User.findByIdAndUpdate(listing.host,{$pull: {listing: listing._id}},{new:true})
            return res.status(200).json({massege:'listing deleted succesfully'})
        } catch (error) {
            return res.status(500).json({massege:'delete Listing error'})
        }
   }

   export const ratingListing = async (req,res) => {
     try {
        let {id} = req.params;
        let{ratings} = req.body; 

        let listing =await Listing.findById(id)
        if(!listing){
            return res.status(404).json({massege:'Listing does not found'})
        }
      
        listing.ratings = Number(ratings)
        await listing.save()
        return res.status(200).json({ratings:listing.ratings})
     } catch (error) {
            return res.status(500).json({massege:'Rating error'})
     }
    
   }

   export const search = async (req,res) => {
      try {
        const {query} = req.query;
        if(!query){
            return res.status(400).json({massege:'query is required'})
        }
        const listing = await Listing.find({
            $or:[
                {title: {$regex: query, $options: 'i'}},
                {city: {$regex: query, $options: 'i'}},
                {landMark: {$regex: query, $options: 'i'}}
            ]
        })
            return res.status(200).json(listing)
        
      } catch (error) {
            return res.status(500).json({massege:'Search Error'})      
      }
   }