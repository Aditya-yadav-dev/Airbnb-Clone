import React,{useContext, useEffect} from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { userDataContext } from '../context/UserContext';
import Card from '../components/Card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MyBookingDetails from '../components/MyBookingDetails';

const MyBooking = () => {
    const navigate = useNavigate()
    const {userData} = useContext(userDataContext)
     useEffect(() => {
      console.log(userData.booking)
     }, [])
     
  return (
    <div className='w-screen max-h-screen flex flex-col justify-start items-center gap-12 px-4 relative'>
                <div onClick={() => { navigate('/') }} className='w-12 h-12 z-10 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-5 top-[5%] rounded-full'>
                    <FaArrowLeft className='text-white text-3xl' />
                </div>
                <div className='uppercase absolute md:top-6 md:right-1/3 z-10 top-3 h-[8%] md:h-[10%] w-[52%] border-2 border-[#908c8c] p-4 flex items-center justify-center text-3xl rounded-md text-[#613b3b] font-semibold text-nowrap mt-5 md:w-[600px]'>MY Booking</div>
                <div className='w-full h-[90%] flex items-center justify-center z-0 gap-6 flex-wrap mt-[120px] overflow-auto'>
                     
               {
                    userData.booking?.map((list,index) => {
                        return <div key={index} className='w-full md:w-[600px] p-0.5 rounded-lg flex justify-center items-center md:flex-row md:items-start flex-col gap-0.5 md:gap-2.5 relative'>
                        <Card key={list._id} title={list.title} landMark={list.landMark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} isBooked={list.isBooked} ratings={list.ratings} host={list.host} />
                        <MyBookingDetails bookingId={list.booking} />
                        </div>
                    })
                }
                {
                  userData.booking.length == 0 && <div className='font-semibold text-5xl '>No Booking</div>
                }

                </div>

    </div>            
    
  )
}

export default MyBooking