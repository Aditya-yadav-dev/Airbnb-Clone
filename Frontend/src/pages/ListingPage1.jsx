import React,{useContext,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { listingDataContext } from '../context/ListingContext';
const ListingPage1 = () => {
    const navigate = useNavigate()
    const { title, settitle,description, setdescription,city, setcity,landMark, setlandMark,rent, setrent,
       frontEndImage1, setfrontEndImage1,frontEndImage2, setfrontEndImage2,frontEndImage3, setfrontEndImage3,
       backendImage1, setbackendImage1,backendImage2, setbackendImage2,backendImage3, setbackendImage3
           } = useContext(listingDataContext)

     const handleImage1 = (e) => { 
            const file =  e.target.files[0];
            setbackendImage1(file)
            setfrontEndImage1(URL.createObjectURL(file))
        }
        const handleImage2 =(e) => { 
          const file =  e.target.files[0];
          setbackendImage2(file)
          setfrontEndImage2(URL.createObjectURL(file))
        }
        const handleImage3 = (e) => { 
          const file =  e.target.files[0];
        setbackendImage3(file);
        setfrontEndImage3(URL.createObjectURL(file))
       }

    return (
        <div className='w-full h-screen bg-white flex items-center  justify-center relative '>
          <div className='overflow-auto max-w-[900px] w-[90%] h-[600px]'>
            <form onSubmit={(e) => { 
                e.preventDefault();
                navigate('/listingpage2')
             }} className='w-full flex items-center justify-center flex-col md:items-start gap-2.5 p-5 '>
                <div onClick={() => { navigate('/') }} className='w-12 h-12 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-5 top-[5%] rounded-full'>
                    <FaArrowLeft className='text-white text-3xl' />
                </div>
                <div className='w-[200px] h-[50px] text-xl bg-[#f14242] cursor-pointer text-white flex items-center justify-center rounded-4xl absolute top-[5%] right-2.5 shadow-lg'>
                    SetUp Your Home
                </div>
                <div className='w-[90%] flex flex-col mt-6 justify-center items-start gap-2.5'>
                    <label htmlFor="title" className='text-xl'>Title:</label>
                    <input type="text" placeholder='_bhk House or best title' onChange={(e)=>{settitle(e.target.value)}} value={title} required className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                </div>
                <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                    <label htmlFor="des" className='text-xl'>Description:</label>
                    <textarea name="description" onChange={(e)=>{setdescription(e.target.value)}} value={description}  required className='w-[90%] h-[80px] resize-none border-2 border-[#555656] rounded-lg text-lg py-2 px-5'>
                    </textarea>
                </div>
                <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                    <label htmlFor="Image1" className='text-xl'>Image1:</label>
                    <div className='flex items-center justify-start w-[90%] h-10 border-2 border-[#555656] rounded-lg text-lg px-2.5'>
                        <input type="file" name='image1' className='w-full text-lg px-3' required onChange={(e)=>{handleImage1(e)}} />
                    </div>
                </div>


                <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                    <label htmlFor="Image2" className='text-xl'>Image2:</label>
                    <div className='flex items-center justify-start w-[90%] h-10 border-2 border-[#555656] rounded-lg text-lg px-2.5'>
                        <input type="file" name='image2' className='w-full text-lg px-3' required onChange={(e)=>{handleImage2(e)}} />
                    </div>
                </div>


                <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                    <label htmlFor="Image3" className='text-xl'>Image3:</label>
                    <div className='flex items-center justify-start w-[90%] h-10 border-2 border-[#555656] rounded-lg text-lg px-2.5'>
                        <input type="file" name='image3' className='w-full text-lg px-3' required onChange={(e)=>{handleImage3(e)}} />
                    </div>
                </div>

                <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                    <label htmlFor="rent" className='text-xl'>Rent:</label>
                    <input type="text" placeholder='Rs.____/day' onChange={(e)=>{setrent(e.target.value)}} value={rent} required className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                </div>
                <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                    <label htmlFor="landMark" className='text-xl'>LandMark:</label>
                    <input type="text"  onChange={(e)=>{setlandMark(e.target.value)}} value={landMark} required className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                </div>

                <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                    <label htmlFor="city" placeholder='city,country' className='text-xl'>City:</label>
                    <input type="text" onChange={(e)=>{setcity(e.target.value)}} value={city} required className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                </div>
                <button className='bg-red-600 text-xl text-white px-12 py-2.5 mt-3.5 md:px-24 hover:bg-red-500 cursor-pointer rounded-lg '>Next</button>

            </form >
        </div>
        </div>
    )
}

export default ListingPage1