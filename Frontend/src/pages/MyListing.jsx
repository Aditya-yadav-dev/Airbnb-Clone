import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import Card from '../components/Card';
import { bookingDataContext } from '../context/BookingContext';
import CutomerDetails from '../components/CutomerDetails';

export const MyListing = () => {
    const { userData } = useContext(userDataContext)
    const navigate = useNavigate();
    const { cancelBooking, showDetailsPopUp, setshowDetailsPopUp } = useContext(bookingDataContext)

    return (
        <div className='w-screen max-h-screen flex flex-col justify-center items-center gap-2.5 relative'>
            <div onClick={() => { navigate('/') }} className='w-12 h-12 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-5 top-[5%] rounded-full'>
                <FaArrowLeft className='text-white text-3xl' />
            </div>
            <div className='uppercase absolute md:top-6 md:right-1/3 z-10 top-3 h-[7%] md:h-[10%] w-[52%] border-2 border-[#908c8c] p-4 flex items-center justify-center text-3xl rounded-md text-[#613b3b] font-semibold text-nowrap mt-5 md:w-[600px]'>MY Listing</div>


            <div className='w-full h-[90%] flex items-center justify-center gap-3.5 overflow-auto flex-wrap mt-[120px]'>
   
                {
                    userData.listing.map((list,index) => {
                        return <div key={index} className='flex justify-center items-center md:flex-row md:items-start flex-col gap-0.5 md:gap-2.5 relative'>
                            <Card key={list._id} title={list.title} landMark={list.landMark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} ratings={list.ratings} isBooked={list.isBooked} host={list.host} />
                            {(list.isBooked && showDetailsPopUp) && <CutomerDetails bookingId={list.booking} />}
                        </div>

                    })
                }
                {
                    userData.listing.length == 0 && <div className='font-semibold text-4xl'>No Listing</div>
                }
            </div>
        </div>
    )
}
