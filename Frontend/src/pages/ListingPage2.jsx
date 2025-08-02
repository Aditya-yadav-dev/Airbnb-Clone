import React,{useContext} from 'react'
import { GiVillage } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../context/ListingContext';
import { MdOutlineWhatshot } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { FaCampground } from "react-icons/fa6";
import { FiFilm } from "react-icons/fi";
import { MdOutlinePool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { FaHouseFlag } from "react-icons/fa6";

const ListingPage2 = () => {
    const navigate = useNavigate()
    const {category, setcategory} = useContext(listingDataContext)
    return (
        <div className='w-full h-screen bg-white flex items-center justify-center relative '>
            <div onClick={() => { navigate('/listingpage1') }} className='w-12 h-12 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-5 top-[5%] rounded-full'>
                <FaArrowLeft className='text-white text-3xl' />
            </div>
            <div className='w-[220px] h-[50px] text-xl bg-[#f14242] cursor-pointer text-white flex items-center justify-center rounded-4xl absolute top-[5%] right-5 shadow-lg'>
                SetUp Your Category
            </div>
            <div className='max-w-[600px] w-[90%] flex gap-6 items-center justify-start mt-10 h-[600px]  flex-col overflow-auto'>
                <div className='text-xl text-black md:text-3xl'>Which of these best describees your place?</div>
                <div className='max-w-[600px] w-full flex gap-4 items-end justify-center h-[600px] flex-wrap md:w-[70%]'>
                    
                    <div onClick={() => { setcategory("Villa") }} className={`w-[180px] h-[100px] cursor-pointer flex-col text-sm hover:border-[#a6a5a5]  border-2 ${category === "Villa" ? "border-3 border-[#8b8b8b]":" border-transparent"} rounded-lg flex items-center justify-center shadow-lg`}>
                        <GiVillage className='text-black text-3xl' />
                        <h1>Villa</h1>
                    </div>
                    <div onClick={() => { setcategory("Farm House") }} className={`w-[180px] h-[100px] cursor-pointer flex-col text-sm hover:border-[#a6a5a5]  border-2 ${category === "Farm House" ? "border-3 border-[#8b8b8b]":" border-transparent "} rounded-lg flex items-center justify-center shadow-lg`}>
                        <FiFilm  className='text-black text-3xl'/>
                        <h1>Farm House</h1>
                    </div>
                    <div onClick={() => { setcategory("Pool House") }} className={`w-[180px] h-[100px] cursor-pointer flex-col text-sm hover:border-[#a6a5a5]  border-2 ${category === "Pool House" ? "border-3 border-[#8b8b8b]":" border-transparent "} rounded-lg flex items-center justify-center shadow-lg`}>
                       <MdOutlinePool className='text-black text-3xl' /> 
                        <h1>Pool House</h1>
                    </div>
                    <div onClick={() => { setcategory("Rooms") }} className={`w-[180px] h-[100px] cursor-pointer flex-col text-sm hover:border-[#a6a5a5]  border-2 ${category === "Rooms" ? "border-3 border-[#8b8b8b]":" border-transparent "} rounded-lg flex items-center justify-center shadow-lg`}>
                       <MdBedroomParent className='text-black text-3xl'/>
                        <h1>Rooms</h1>
                    </div>
                    <div onClick={() => { setcategory("PG") }} className={`w-[180px] h-[100px] cursor-pointer flex-col text-sm hover:border-[#a6a5a5]  border-2 ${category === "PG" ? "border-3 border-[#8b8b8b]":" border-transparent "} rounded-lg flex items-center justify-center shadow-lg`}>
                        <FaCampground className='text-black text-3xl'/>
                        <h1>PG</h1>
                    </div>
                    <div onClick={() => { setcategory("Cabins") }} className={`w-[180px] h-[100px] cursor-pointer flex-col text-sm hover:border-[#a6a5a5]  border-2 ${category === "Cabins" ? "border-3 border-[#8b8b8b]":" border-transparent "} rounded-lg flex items-center justify-center shadow-lg`}>
                       <GiWoodCabin className='text-black text-3xl'/>
                        <h1>Cabins</h1>
                    </div>
                    <div onClick={() => { setcategory("Shops") }} className={`w-[180px] h-[100px] cursor-pointer flex-col text-sm hover:border-[#a6a5a5]  border-2 ${category === "Shops" ? "border-3 border-[#8b8b8b]":" border-transparent "} rounded-lg flex items-center justify-center shadow-lg`}>
                        <FaShop className='text-black text-3xl' />
                        <h1>Shops</h1>
                    </div>
                </div>
                <button disabled={!category} onClick={() => { navigate('/listingpage3') }} className='bg-red-600 text-xl text-white px-12 py-2.5 mt-3.5 md:px-24 hover:bg-red-500 cursor-pointer rounded-lg absolute bottom-[3%] md:bottom-[10%] right-[35%] md:right-[10%] '>Next</button>
            </div>                  
        </div>
    )
}

export default ListingPage2