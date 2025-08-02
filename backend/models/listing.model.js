import mongoose from "mongoose"
import User from "./user.model.js";
import Booking from "./booking.model.js";
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    rent: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    landMark: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true    
    },
    ratings:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    guest:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isBooked: {    
        type: Boolean,
        default: false
    },
    booking:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }

}, { timestamps: true })

const Listing = mongoose.model("Listing", listingSchema)

export default Listing;