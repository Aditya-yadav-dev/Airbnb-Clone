import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { listingDataContext } from '../context/ListingContext';
import { useNavigate } from 'react-router-dom';

const ListingPage3 = () => {
     const navigate =useNavigate()
    const { title, settitle, description, setdescription, city, setcity, landMark, setlandMark, rent, setrent, category, setcategory,
        frontEndImage1, setfrontEndImage1, frontEndImage2, setfrontEndImage2, frontEndImage3, setfrontEndImage3,
        backendImage1, setbackendImage1, backendImage2, setbackendImage2, backendImage3, setbackendImage3, handleAddListing,Adding, setAdding} = useContext(listingDataContext)


    return (
        <div className='w-full h-screen bg-white flex items-center justify-center flex-col relative overflow-auto '>
            <div onClick={() => { navigate('/listingpage2') }} className='w-12 h-12 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-5 top-[5%] rounded-full'>
                <FaArrowLeft className='text-white text-3xl' />
            </div>

            <div className='w-[95%] flex items-start justify-start  text-2xl md:w-[80%] mb-[1px]'>
                <h1 className='text-xl text-[#272727] md:text-3xl text-ellipsis text-nowrap overflow-hidden'>
                    {`In ${landMark} , ${city}`}
                </h1>
            </div>

            <div className='w-[95%] h-[400px] my-3.5 flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                <div className='w-full h-[65%] md:w-[70%] md:h-full overflow-hidden flex items-center justify-center border-2 border-white'>
                    <img src={frontEndImage1} alt="" className='w-full' />
                </div>
                <div className='w-full h-full flex items-center justify-center md:w-[50%] md:h-full md:flex-col bg-black'>
                    <div className='w-full h-[50%] overflow-hidden flex items-center justify-center border-2'>
                        <img src={frontEndImage2} alt="" className='w-full' />
                    </div>
                    <div className='w-full h-[50%] overflow-hidden flex items-center justify-center border-2'>
                        <img src={frontEndImage3} alt="" className='w-full' />
                    </div>
                </div>
            </div>

            <div className='w-[95%] uppercase flex items-start justify-start text-xl md:w-[80%] md:text-2xl'>
                {`${title} ${category} ${landMark}`}
            </div>
            <div className='w-[95%] uppercase flex items-start justify-start text-xl md:w-[80%] md:text-2xl'>
                {`${description}`}
            </div>
            <div className='w-[95%] uppercase flex items-start justify-start text-lg md:w-[80%] md:text-2xl'>
                {`Rs.${rent}`}
            </div>

            <div className='W-[95%] h-[50px] flex items-center justify-start px-[110px]'>
                <button onClick={handleAddListing} className='px-[50px] py-2.5 bg-red-900 text-white text-xl md:px-[100px] rounded-lg'>
                 { Adding ? 'Adding...' : 'Add Listing' }
                </button>
            </div>

        </div>
    )
}

export default ListingPage3