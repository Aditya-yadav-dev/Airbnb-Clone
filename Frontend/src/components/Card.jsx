import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { listingDataContext } from '../context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc'
import { GiConfirmed } from 'react-icons/gi';
import { bookingDataContext } from '../context/BookingContext';

const Card = ({ title, landMark, image1, image2, image3, rent, city, id, ratings, isBooked, host }) => {
  const { cancelBooking, showDetailsPopUp, setshowDetailsPopUp } = useContext(bookingDataContext)
  const { userData } = useContext(userDataContext)
  const { handleViewCard } = useContext(listingDataContext)
  const [PopUp, setPopUp] = useState(false)
  const navigate = useNavigate()
  const handleClick = (id) => {
    if (userData) {
      handleViewCard(id)
    }
    else {
      navigate('/login')
    }
  }

  return (
    <div onClick={() => { !isBooked ? handleClick(id) : null }} className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg relative cursor-pointer'>
      {isBooked && <div className='w-fit flex justify-center items-center gap-1 px-2.5 py-0.5 bg-white rounded-lg absolute top-3 right-3.5 text-green-400'><GiConfirmed className='h-5 w-5 text-green-600' />Booked</div>}
      {isBooked && host === userData?._id && <div onClick={() => { setPopUp(true) }} className='w-fit flex justify-center items-center gap-1 px-2.5 py-0.5 bg-white rounded-lg absolute top-3 right-3.5 text-green-400'><FcCancel className='h-5 w-5 text-green-700' /> Cancel Booking</div>}
      {isBooked && host === userData?._id && <div onClick={() => { setshowDetailsPopUp(preVal => !preVal); navigate('/mylisting'); }} className='w-fit flex justify-center items-center gap-1 px-2.5 py-0.5 bg-white rounded-lg absolute top-14 right-[55px] text-green-400 cursor-pointer'>{!showDetailsPopUp ? "Show Details" : "Hide Details"} </div>}

      {PopUp && <div className='w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[100px] left-[13px] rounded-lg'>
        <div className='w-full h-1/2 text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-xl p-2.5 cursor-pointer'>Booking Cancel</div>
        <div className='w-full h-1/2 text-xl font-semibold flex items-start justify-center gap-2.5 text-[#986b6b]'>Are you sure?
          <button onClick={() => { cancelBooking(id); setPopUp(false) }} className='px-5 bg-red-700 text-white rounded-lg hover:bg-slate-600 cursor-pointer'>Yes</button>
          <button onClick={() => { setPopUp(false) }} className='px-5 bg-red-700 text-white rounded-lg hover:bg-slate-600 cursor-pointer'>No</button>
        </div>
      </div>}

      <div className='w-full h-[67%] rounded-lg overflow-auto flex '>
        <img src={image1} className='w-full flex-shrink-0' />
        <img src={image2} className='w-full flex-shrink-0' />
        <img src={image3} className='w-full flex-shrink-0' />
      </div>
      <div className='w-full h-[33%] py-5 flex flex-col gap-0.5 '>
        <div className='flex items-center justify-between text-xl'>
          <span className='capitalize text-sm w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap'>In {landMark}, {city}</span>
          <span className='flex justify-center items-center gap-1.5'><FaStar className='text-red-700' />{ratings}</span>
        </div>
        <span className='capitalize text-sm w-[80%] text-ellipsis overflow-hidden text-nowrap'>In {title}</span>
        <span className='text-lg font-semibold text-[#986b6b] capitalize'>In ₹{rent}/day</span>
      </div>
    </div>
  )
}

export default Card