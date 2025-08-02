import React, { useContext, useState } from 'react'
import { GiConfirmed } from 'react-icons/gi';
import { bookingDataContext } from '../context/BookingContext';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Star from '../components/Star';
import axios from 'axios';
import { AuthDataContext } from '../context/AuthContext';
import { listingDataContext } from '../context/ListingContext';
import { userDataContext } from '../context/UserContext';


const Booked = () => {
    const { bookingData } = useContext(bookingDataContext)
    const {ServerUrl} = useContext(AuthDataContext)
    const { handleGetListing,cardDetails} = useContext(listingDataContext)
    const {getCurrentUser} = useContext(userDataContext)
    const navigate = useNavigate();
    const [star, setstar] = useState(null)

    const handlestar = async (value) => {
        setstar(value)
        console.log('You rated Value')
    }

    const handleRating = async (id) => {
        try {
            let response = await axios.post(`${ServerUrl}/api/listing/rating/${id}`,
                {ratings: star},
                {withCredentials:true}
            )
            await  handleGetListing()
            await getCurrentUser()
            console.log(response)
            navigate('/')
        } catch (error) {
          console.log(error)  
        }
        
    }

    return (
        <div className='w-screen min-h-screen flex items-center justify-center gap-6 relative bg-slate-200 flex-col'>
            <div className='w-[95%] max-w-[500px] h-[400px] bg-white p-9 flex items-center justify-evenly border-[1px] border-[#b5b5b5] flex-col gap-5 font-semibold'>
                <div className='w-full flex flex-col gap-1.5 justify-center items-center'>
                    < GiConfirmed className='w-[100px] h-[100px]  text-green-700 ' />
                    <span> Booking Confirmed</span>
                </div>
                <div className='w-full flex flex-col gap-1.5'>
                <div className='w-full flex items-center justify-between text-sm md:text-lg '>
                    <span>Booking Id: <span>{bookingData._id}</span></span>
                </div>
                <div className='w-full flex flex-col items-start justify-between text-sm md:text-lg '>
                    <span>Owner's Name: <span>{bookingData.host?.name}</span></span>
                    <span>Owner's Email: <span>{bookingData.host?.email}</span></span>
                </div>
                <div className='w-full flex items-center justify-between text-sm md:text-lg '>
                    <span>Toatal Rent: <span>{bookingData.totalRent}</span></span>
                </div>
                </div>
            </div>
            <div className='w-[95%] max-w-[600px]  h-[200px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-5 p-5 md:w-[85%] rounded-lg'>
                <h1 className='text-lg'>{star} out of 5 Ratings</h1>
                <Star onRate={handlestar} />
                <button onClick={() => { handleRating(cardDetails._id) }} className='px-7 py-2.5 bg-red-600 text-white text-lg md:px-[100px] rounded-lg text-nowrap'>Submit</button>
            </div>
            <button onClick={() => { navigate('/') }} className='px-[30px] py-2.5 bg-red-600 text-white text-lg md:px-[100px] rounded-lg text-nowrap absolute top-6 right-5'>Back to Home</button>

        </div>
    )
}

export default Booked