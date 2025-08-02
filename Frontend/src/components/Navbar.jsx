import React, { useState, useContext, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import logo from '../assets/Airbnb.png'
import { GiWoodCabin } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineWhatshot } from "react-icons/md";
import { GiVillage } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { FaCampground } from "react-icons/fa6";
import { FiFilm } from "react-icons/fi";
import { MdOutlinePool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { FaHouseFlag } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [showpopUp, setshowpopUp] = useState(false)
    const [cat, setcat] = useState('')
    const [inputVal, setinputVal] = useState('')
    const navigate = useNavigate();
    const { handleViewCard } = useContext(listingDataContext)
    const {listingData, setlistingData,newListingData, setnewListingData,searchData, setsearchData, handleSearch} = useContext(listingDataContext)
    const { ServerUrl } = useContext(AuthDataContext);
    const { userData, setuserData } = useContext(userDataContext)
    const handlelogOut = async () => {
        try {
            const response = await axios.get(ServerUrl + '/api/auth/logout', { withCredentials: true })
            // console.log(response)
            setuserData(null)
            toast.success('LogOut Successfully')
        } catch (error) {
            // console.log(error)
            toast.error('LogOut faild')
        }

    }

    useEffect(() => {
      setTimeout(()=>{
        handleSearch(inputVal)
      },600)
    }, [inputVal])
    
     const handleClick = (id) => {
    if (userData) {
      handleViewCard(id)
    }
    else {
      navigate('/login')
    }
  }

    const handleCategory = (category) => {    
        setcat(category)
        if(category == 'Trending'){
            setnewListingData(listingData)
        }
        else {
        setnewListingData(listingData.filter((list) => list.category === category ))     
        }
     }

    return (
        <div className='w-screen fixed top-0 bg-white z-10'>
            <div className='w-screen min-h-20 border-b-2 border-[#dcdcdc] md:px-10 px-4 flex items-center justify-between'>
                <div>
                    <img src={logo} className='w-[100px] rounded-lg' />
                </div>
                <div className='md:block hidden w-[35%]  relative'>
                    <input type="text" onChange={(e) => { setinputVal(e.target.value) }} value={inputVal} placeholder='Any Where | Any location | Any City' className='w-full  px-8 py-2.5 border-1 border-[#bdbaba] outline-none overflow-auto rounded-4xl text-[17px]' />
                    <button className='absolute p-2.5 rounded-[50px] bg-[red] cursor-pointer right-[3%] top-[5px]'> <IoSearch className='w-5 h-5 text-white' /></button>
                </div>
                <div className='flex items-center justify-center gap-2.5 relative'>
                    <span onClick={() => {
                        navigate('/listingpage1')
                        setshowpopUp(false)
                    }} className='text-xl cursor-pointer rounded-[50px] hover:bg-[#ded9d9] bg-red-500 px-3 py-1.5 hidden md:block'>List your Home</span>
                    <button onClick={() => { setshowpopUp(!showpopUp) }} className='px-5 py-2.5 flex items-center justify-center gap-1.5 border-1 cursor-pointer border-[#8d8c8c] rounded-[50px] hover:shadow-lg '>
                        <span ><GiHamburgerMenu className='w-5 h-5 cursor-pointer' /></span>
                        {!userData && <span><CgProfile className='w-6 h-6' /></span>}
                        {userData && <span className='w-7 h-7 capitalize flex justify-center items-center bg-black rounded-full text-white'>{userData.name.trim().slice(0, 1)}</span>}
                    </button>
                    {showpopUp && <div className='w-[220px] h-[245px] bg-slate-50 border-1 border-[aaa9a9] absolute top-[110%] z-10 right-[10%] rounded-lg'>
                        <ul className='flex flex-col items-start justify-center gap-5 py-5'>
                            {!userData ? <li onClick={() => {
                                navigate('/login')
                                setshowpopUp(false)
                            }} className='text-xl px-5 hover:bg-[#f4f3f3] w-full cursor-pointer rounded-lg'>Login</li> :
                                <li onClick={() => {
                                    handlelogOut()
                                    setshowpopUp(false)
                                }} className='hover:bg-[#f4f3f3] w-full cursor-pointer rounded-lg text-xl px-5 py-1'>Logout</li>}
                            <li className='hover:bg-[#f4f3f3]  cursor-pointer rounded-lg border-1 w-full border-gray-400'></li>
                            <li className='hover:bg-[#f4f3f3] w-full cursor-pointer rounded-lg text-xl px-5' onClick={() => {
                                navigate('/listingpage1')
                                setshowpopUp(false)
                            }}>List your Home</li>
                            <li onClick={() => { navigate('/mylisting') }} className='hover:bg-[#f4f3f3] w-full cursor-pointer rounded-lg text-xl px-5'>My listing</li>
                            <li onClick={() => { navigate('/mybooking') }} className='hover:bg-[#f4f3f3] w-full cursor-pointer rounded-lg text-xl px-5'>My Booking</li>
                        </ul>
                    </div>}
                </div>
                {
                    (searchData && inputVal ) && <div className='w-screen h-[450px] flex flex-col gap-5 absolute top-1/2 overflow-auto left-0 justif-start items-center'>
                        <div className='max-w-[700px] w-screen h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-5 rounded-lg border border-amber-200 cursor-pointer'>
                            {
                                searchData.map((search,index) => { 
                                    return <div onClick={() => { handleClick(search._id) }} className='border-b border-black p-3.5 hover:bg-amber-100 rounded-lg' key={index}>
                                        {search.title} in {search.landMark}, {search.city}
                                    </div>
                                 })
                            }
                        </div>

                    </div>
                }
            </div>
            <div className='mt-3 flex justify-center items-center'>
                <div className='md:hidden block w-[96%] relative'>
                    <input type="text" placeholder='Any Where | Any location | Any City' className='w-full px-6 py-2 border-1 border-[#bdbaba] outline-none overflow-auto rounded-4xl text-[17px]' />
                    <button className='absolute p-2 z-0 rounded-[50px] bg-[red] right-[3%] top-[5px] cursor-pointer'> <IoSearch className='w-4 h-4 text-white' /></button>
                </div>
            </div>
            <div className='w-full h-20 overflow-auto'>
                <div className='min-w-max h-full flex justify-center items-center gap-9 '>
                <div className='flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] cursor-pointer' onClick={() => { handleCategory('Trending');
                    setcat('')
                 }}> <span className='text-2xl text-black'><MdOutlineWhatshot /></span> <h3>Trending</h3></div>
                <div className={`flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] ${cat=="Villa"?"border-b-2 border-[#a6a5a5]":''} cursor-pointer`} onClick={() => { handleCategory('Villa') }}> <span className='text-2xl text-black'><GiVillage /></span> <h3>Villa</h3></div>
                <div className={`flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] ${cat=="Farm House"?"border-b-2 border-[#a6a5a5]":''} text-nowrap cursor-pointer`} onClick={() => { handleCategory('Farm House') }}> <span className='text-2xl text-black'><FiFilm /></span> <h3>Farm House</h3></div>
                <div className={`flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] ${cat=="Pool House"?"border-b-2 border-[#a6a5a5]":''} text-nowrap cursor-pointer`} onClick={() => { handleCategory('Pool House') }}> <span className='text-2xl text-black'><MdOutlinePool /></span> <h3>Pool House</h3></div>
                <div className={`flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] ${cat=="Rooms"?"border-b-2 border-[#a6a5a5]":''} cursor-pointer`} onClick={() => { handleCategory('Rooms') }}> <span className='text-2xl text-black'><MdBedroomParent /></span> <h3>Rooms</h3></div>
                <div className={`flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] ${cat=="PG"?"border-b-2 border-[#a6a5a5]":''} cursor-pointer`} onClick={() => { handleCategory('PG') }}> <span className='text-2xl text-black'><FaCampground /></span> <h3>PG</h3></div>
                <div className={`flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] ${cat=="Cabins"?"border-b-2 border-[#a6a5a5]":''} cursor-pointer`} onClick={() => { handleCategory('Cabins') }}> <span className='text-2xl text-black'><GiWoodCabin /></span> <h3>Cabins</h3></div>
                <div className={`flex flex-col items-center justify-center hover:border-b-[1px] border-[a6a5a5] ${cat=="Shops"?"border-b-2 border-[#a6a5a5]":''} cursor-pointer`} onClick={() => { handleCategory('Shops') }}> <span className='text-2xl text-black'><FaShop /></span> <h3>Shops</h3></div>
                 </div>
            </div>


        </div>
    )
}

export default Navbar