import express from 'express';
import { cancelBooking, createBooking, getBooking } from '../controller/booking.controller.js';
import isAuth from '../middleware/isAuth.js'
const bookingRounter = express.Router()

bookingRounter.post('/create/:id',isAuth,createBooking)
bookingRounter.delete('/cancelbooking/:id',isAuth,cancelBooking)
bookingRounter.get('/getbooking/:id',isAuth,getBooking)

export default bookingRounter;   