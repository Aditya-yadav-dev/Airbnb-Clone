import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";


export const createBooking = async (req,res) => {
    try {
       const {id} = req.params;
       let {checkIn, checkOut, totalRent} = req.body;
       let listing = await Listing.findById(id)
       if(!listing){
        return res.status(404).json({massege:"listing not found"})
    }
    if(listing.isBooked){
        return res.status(400).json({massege:"listing is already Booked"})
    }
    if(new Date(checkIn) >= new Date(checkOut)){
        return res.status(404).json({massege:"Invailid checkIn/checkOut"})
        }
        
       let booking = await Booking.create({
         checkIn,
         checkOut,
         totalRent,
         host:listing.host,
         guest: req.userId,
         listing: listing._id 
        })
        await booking.populate('host','name email')

        listing.booking = booking._id;
       const user = await User.findByIdAndUpdate(req.userId,{ $push: {booking: listing._id}},{new: true}) 
       if(!user){
        return res.status(404).json({massege:"user not found"})
    }
    listing.isBooked= true
    listing.guest= req.userId
    await listing.save()
    return res.status(201).json(booking)
} catch (error) {
        return res.status(501).json({massege:`Booking created error is : ${error}`})
        
    }
    
}

export const cancelBooking = async (req,res) => {
     try {
        const {id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id,{isBooked:false},{new:true});
        let user = await User.findByIdAndUpdate(listing.guest,{ $pull:{booking: listing._id}},{new:true})
        if(!user){
            return res.status(404).json({massege:"user is not found"})
        } 
       await Booking.findByIdAndDelete(listing.bookingId);
        return res.status(200).json({massege:"user Booking Cancelled"})
        
    } catch (error) {
         return res.status(404).json({massege:"Cancel Booking error"})
        
     }
    
} 

export const getBooking = async (req,res) => {
    try {
        const {id} = req.params;
        const booking = await Booking.findById(id).populate("listing","category").populate("guest","name email").populate("host","name email");
        if(!booking){
            return res.status(400).json({massege: "booking not found"})
        }
   
        return res.status(200).json(booking);
        
    } catch (error) {
        return res.status(500).json({massege: `get booking error ${error}`})
        
    }
}