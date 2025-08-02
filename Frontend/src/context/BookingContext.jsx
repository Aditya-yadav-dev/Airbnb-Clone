import React, { Children, useState, useEffect, useContext } from 'react'
import { createContext } from 'react'
import { userDataContext } from './UserContext'
import { AuthDataContext } from './AuthContext'
import { listingDataContext } from './ListingContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export const bookingDataContext = createContext()
const BookingContext = ({children}) => {
    const [checkIn, setcheckIn] = useState('')
    const [checkOut, setcheckOut] = useState('')
    const [total, settotal] = useState(0)
    const [night, setnight] = useState(0)
    const [booking, setbooking] = useState(false)
    const [bookingData, setbookingData] = useState([])
    const {getCurrentUser} = useContext(userDataContext)
    const [showDetailsPopUp, setshowDetailsPopUp] = useState(false)
    const {ServerUrl} = useContext(AuthDataContext)
    const {handleGetListing} = useContext(listingDataContext)
    const  navigate = useNavigate();
    const handleBooking =  async (id) => {
        try {
            setbooking(true)
            let response = await axios.post(ServerUrl+`/api/booking/create/${id}`,{
                 checkIn ,checkOut,totalRent: total
            },{withCredentials: true})
            await getCurrentUser()
            await handleGetListing()
            // console.log('booking data is :',response.data)
            setbookingData(response.data)
            setbooking(false)
            toast.success('Booking Confirmed')
            navigate('/booked')
        } catch (error) {
            // console.log(error)
            setbookingData(null)
            setbooking(false)
            toast.error('Booking failed')
        }
        
    }

    const cancelBooking = async (id) => {
        try {
              let response = await axios.delete(ServerUrl+`/api/booking/cancelbooking/${id}`,{withCredentials: true})
              await getCurrentUser()
              await handleGetListing()
            //   console.log('booking cancel data is:',response.data)
            toast.success('Booking Cancelled Successfully')
        } catch (error) {
            toast.error('Booking Cancellation error')
        //    console.log(error) 
        }
    }


   let value = {
       checkIn, setcheckIn, checkOut, setcheckOut,night,booking, setbooking, setnight, total, settotal,bookingData,cancelBooking, setbookingData, handleBooking,showDetailsPopUp, setshowDetailsPopUp
    }
  return (
   <bookingDataContext.Provider value={value}>
    {children}
   </bookingDataContext.Provider>
  )
}

export default BookingContext