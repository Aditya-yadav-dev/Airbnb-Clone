import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../context/ListingContext'
import { userDataContext } from '../context/UserContext'
import { FaArrowLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { AuthDataContext } from '../context/AuthContext';
import { FaStar } from 'react-icons/fa6';
import { bookingDataContext } from '../context/BookingContext';
import { toast } from 'react-toastify';
const ViewCard = () => {
    const navigate = useNavigate()
    const { cardDetails, setcardDetails, updating, setupdating, deleting, setdeleting } = useContext(listingDataContext)
    const { ServerUrl } = useContext(AuthDataContext)
    const { userData } = useContext(userDataContext)
    const [updatePopUp, setupdatePopUp] = useState(false)
    const [bookingPopUp, setbookingPopUp] = useState(false)
    const [title, settitle] = useState(cardDetails.title)
    const [description, setdescription] = useState(cardDetails.description)
    const [minDate, setminDate] = useState('')
    const [city, setcity] = useState(cardDetails.city)
    const [landMark, setlandMark] = useState(cardDetails.landMark)
    const [rent, setrent] = useState(cardDetails.rent)
    const [backendImage1, setbackendImage1] = useState(null)
    const [backendImage2, setbackendImage2] = useState(null)
    const [backendImage3, setbackendImage3] = useState(null)

    const { checkIn, setcheckIn, checkOut, setcheckOut, night, setnight, total, settotal, bookingData, setbookingData, handleBooking, booking, setbooking} = useContext(bookingDataContext)
    useEffect(() => {
        console.log('carddetails is:', cardDetails)
    }, [cardDetails])

    const handleImage1 = (e) => {
        const file = e.target.files[0];
        setbackendImage1(file)
    }
    const handleImage2 = (e) => {
        const file = e.target.files[0];
        setbackendImage2(file)
    }
    const handleImage3 = (e) => {
        const file = e.target.files[0];
        setbackendImage3(file);
    }

    useEffect(() => {
        let today = new Date().toISOString().split('T')[0]
        console.log('Todat ISOS date is:', today)
        setminDate(today)
    }, [])

    useEffect(() => {
        if (checkIn && checkOut) {
            let inDate = new Date(checkIn)
            let outDate = new Date(checkOut)
            console.log('inDtae is:', inDate, 'outDate is:', outDate)
            let n = (outDate - inDate) / (24 * 60 * 60 * 1000)
            setnight(n)
            let airBnbCharge = (cardDetails.rent * (7 / 100))
            let tax = (cardDetails.rent * (7 / 100))

            if (n > 0) {
                settotal((cardDetails.rent * n) + airBnbCharge + tax)
            }
            else {
                settotal(0)
            }
        }
    }, [checkIn, checkOut, cardDetails.rent, total])


    const handleUpdateListing = async () => {
        try {
            setupdating(true)
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('city', city)
            formData.append('landMark', landMark)
            formData.append('rent', rent)
            if (backendImage1) formData.append('image1', backendImage1)
            if (backendImage2) formData.append('image2', backendImage2)
            if (backendImage3) formData.append('image3', backendImage3)
            let response = await axios.post(ServerUrl + `/api/listing/updateListing/${cardDetails._id}`,
                formData,
                { withCredentials: true }
            );
            setupdating(false)
            navigate('/')
            toast.success('Listing Updated Successfully')
            console.log(response)
            settitle('')
            setdescription('')
            setrent('')
            setlandMark('')
            setcity('')
            setbackendImage1(null)
            setbackendImage2(null)
            setbackendImage3(null)
        } catch (error) {
            setupdating(false)
            toast.error('Listing Update Error')
            console.log(error)
        }
    }

    const handleDeleteListing = async () => {
        try {
            setdeleting(true)
            const response = await axios.get(ServerUrl + `/api/listing/deletelisting/${cardDetails._id}`, { withCredentials: true })
            setdeleting(false)
            navigate('/')
            toast.success('Listng deleted Successfully')
            console.log(response)
        } catch (error) {
            setdeleting(false)
            toast.error('Listing Delete Error')
            console.log(error)
        }
    }

    return (
        <div className='w-full h-screen bg-white flex items-center justify-center flex-col relative overflow-auto '>
                <div onClick={() => { navigate('/') }} className='w-12 h-12 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-5 top-[5%] rounded-full'>
                    <FaArrowLeft className='text-white text-3xl' />
                </div>

                <div className='w-[95%] flex items-start justify-start  text-2xl md:w-[80%] mb-[1px]'>
                    <h1 className='text-xl text-[#272727] md:text-3xl text-ellipsis font-extrabold text-nowrap overflow-hidden'>
                        {`In ${cardDetails.landMark} , ${cardDetails.city}`}
                    </h1>
                </div>

                <div className='w-[95%] h-[400px] my-3.5 flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                    <div className='w-full h-[65%] md:w-[70%] md:h-full overflow-hidden flex items-center justify-center border-2 border-white'>
                        <img src={cardDetails.image1} className='h-full' />
                    </div>
                    <div className='w-full h-full flex items-center justify-center md:w-[50%] md:h-full md:flex-col bg-black'>
                        <div className='w-full h-[50%] overflow-hidden flex items-center justify-center border-2'>
                            <img src={cardDetails.image2} className='w-full' />
                        </div>
                        <div className='w-full h-[50%] overflow-hidden flex items-center justify-center border-2'>
                            <img src={cardDetails.image3} className='w-full' />
                        </div>
                    </div>
                </div>

                <div className='w-[95%] uppercase flex items-start justify-start text-xl font-bold md:w-[80%] md:text-2xl'>
                    {`${cardDetails.title} ${cardDetails.category} ${cardDetails.landMark}`}
                </div>
                <div className='w-[95%] uppercase flex items-start justify-start text-xl font-bold md:w-[80%] md:text-2xl'>
                    {`${cardDetails.description}`}
                </div>
                <div className='w-[95%] uppercase flex items-start justify-start text-lg font-semibold md:w-[80%] md:text-2xl'>
                    {`Rs.${cardDetails.rent}`}
                </div>

                <div className='W-[95%] h-[50px] flex items-center justify-start gap-2.5 px-[110px]'>
                    {cardDetails.host === userData._id ? <button onClick={() => { setupdatePopUp(true) }} className='text-nowrap mt-2 cursor-pointer px-[50px] py-2.5 bg-red-900 text-white text-xl md:px-[100px] rounded-lg'>
                        Edit Listing
                    </button> :
                        <button onClick={() => { setbookingPopUp(true) }} className='cursor-pointer hover:bg-red-800 capitalize px-[50px] py-2.5 bg-red-900 text-white text-xl md:px-[100px] rounded-lg'>
                            Reserve
                        </button>}
                </div>

                {/* Update listing start */}

                {updatePopUp && <div className='w-full h-full flex justify-center bg-[#000000a9] items-center absolute top-0 left-0 z-50 backdrop-blur-sm'>
                    <RxCross2 onClick={() => { setupdatePopUp(false) }} className='w-9 h-9 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-10 top-[5%] rounded-full' />
                    <div className='w-[200px] h-[50px] text-xl bg-[#f14242] cursor-pointer text-white flex items-center justify-center rounded-4xl absolute top-[4%] right-2.5 shadow-lg'>
                        Update your details
                    </div>

                    <div className='w-[85%] md:w-[65%] h-[650px] md:h-[666px] bg-[#272727] flex justify-center items-end p-6 overflow-auto rounded-xl'>
                        <form onSubmit={(e) => { e.preventDefault() }} className='w-full h-[70%] text-white md:h-[80%] flex items-center justify-center flex-col gap-2.5 '>
                            <div className='w-[90%] flex flex-col mt-6 justify-center items-start gap-2.5'>
                                <label htmlFor="title" className='text-xl'>Title:</label>
                                <input type="text" onChange={(e) => { settitle(e.target.value) }} value={title} placeholder='_bhk House or best title' required className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                            </div>
                            <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                                <label htmlFor="des" className='text-xl'>Description:</label>
                                <textarea name="description" required onChange={(e) => { setdescription(e.target.value) }} value={description} className='w-[90%] h-[80px] resize-none border-2 border-[#555656] rounded-lg text-lg py-2 px-5'>
                                </textarea>
                            </div>
                            <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                                <label htmlFor="Image1" className='text-xl'>Image1:</label>
                                <div className='flex items-center justify-start w-[90%] h-10 border-2 border-[#555656] rounded-lg text-lg px-2.5'>
                                    <input type="file" name='image1' onChange={handleImage1} className='w-full text-lg px-3' />
                                </div>
                            </div>


                            <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                                <label htmlFor="Image2" className='text-xl'>Image2:</label>
                                <div className='flex items-center justify-start w-[90%] h-10 border-2 border-[#555656] rounded-lg text-lg px-2.5'>
                                    <input type="file" name='image2' onChange={handleImage2} className='w-full text-lg px-3' />
                                </div>
                            </div>


                            <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                                <label htmlFor="Image3" className='text-xl'>Image3:</label>
                                <div className='flex items-center justify-start w-[90%] h-10 border-2 border-[#555656] rounded-lg text-lg px-2.5'>
                                    <input type="file" name='image3' onChange={handleImage3} className='w-full text-lg px-3' />
                                </div>
                            </div>

                            <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                                <label htmlFor="rent" className='text-xl'>Rent:</label>
                                <input type="text" placeholder='Rs.____/day' onChange={(e) => { setrent(e.target.value) }} value={rent} required className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                            </div>
                            <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                                <label htmlFor="landMark" className='text-xl'>LandMark:</label>
                                <input type="text" required onChange={(e) => { setlandMark(e.target.value) }} value={landMark} className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                            </div>

                            <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
                                <label htmlFor="city" placeholder='city,country' className='text-xl'>City:</label>
                                <input type="text" required onChange={(e) => { setcity(e.target.value) }} value={city} className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
                            </div>
                            <div className='w-full flex items-center justify-evenly mb-6 gap-2 ml-2'>
                                <button onClick={handleUpdateListing} disabled={updating} className='bg-red-600 text-xl text-white text-nowrap px-3.5 py-2.5 mt-2 md:px-20 hover:bg-red-500 cursor-pointer rounded-lg '>{updating ? 'Updating...' : 'Update Listing'}</button>
                                <button onClick={handleDeleteListing} disabled={deleting} className='bg-red-600 text-xl text-white text-nowrap px-3.5 py-2.5 mt-2 md:px-20 hover:bg-red-500 cursor-pointer rounded-lg '>{deleting ? 'deleting...' : 'delete Listing'}</button>
                            </div>
                        </form>
                    </div>
                </div>
                }

                {
                    bookingPopUp && <div className='w-full h-full flex flex-col md:flex-row p-5 gap-6 md:gap-[100px] justify-center bg-[#ffffffcd] items-center absolute top-0 left-0 z-100 backdrop-blur-sm'>
                        <RxCross2 onClick={() => { setbookingPopUp(false) }} className='w-9 h-9 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-10 top-[5%] rounded-full' />

                        <form onSubmit={(e) => { e.preventDefault() }} className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f3f1f1] p-5 rounded-lg flex items-center justify-start flex-col gap-2.5 border-2 border-[#dedddd]'>
                            <h1 className='w-full py-2.5 text-2xl border-b-2 text-center border-[#a3a3a3]'>Confirm & Book</h1>
                            <div className='w-full h-[70%] mt-2.5 rounded-lg p-2.5'>
                                <h1 className='text-xl font-semibold'>Your Trip-</h1>
                                <div className='w-[90%] flex flex-col mt-6 md:flex-row justify-start items-center md:justify-center md:items-start gap-2.5'>
                                    <label htmlFor="checkIn" className='md:text-xl text-sm'>CheckIn:</label>
                                    <input type="date" onChange={(e) => { setcheckIn((e.target.value).split('T')[0]) }} min={minDate} value={checkIn} required placeholder='mm/dd/yy' className='w-[200px] border-2 border-[#555656] h-[40px] bg-transparent md:text-xl rounded-lg text-lg px-2.5' />
                                </div>
                                <div className='w-[90%] flex flex-col mt-6 md:flex-row justify-start items-center md:justify-center md:items-start gap-2.5'>
                                    <label htmlFor="checkOut" className='md:text-xl text-sm'>CheckOut:</label>
                                    <input type="date" onChange={(e) => { setcheckOut((e.target.value).split('T')[0]) }} min={minDate} value={checkOut} required placeholder='mm/dd/yy' className='w-[200px] border-2 border-[#555656] h-[40px] bg-transparent md:text-xl rounded-lg text-lg px-2.5' />
                                </div>
                             <div className='w-full flex itemsc justify-center mt-7'><button onClick={() => { handleBooking(cardDetails._id) }} className='bg-red-600 text-xl text-white text-nowrap px-4 py-3 mt-4 md:px-20 hover:bg-red-500 cursor-pointer rounded-lg '>{booking ? 'Booking...' : 'Book Now'}</button></div> 


                            </div>
                        </form>

                        <div className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f3f1f1] p-5 rounded-lg flex items-center justify-center flex-col gap-2.5 border-2 border-[#dedddd]'>
                            <div className='w-[95%] h-[30%] border-[1px] border-[#dedddd] rounded-lg flex justify-center items-center gap-2 p-4 overflow-hidden'>

                                <div className='w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]'>
                                    <img src={cardDetails.image1} className='w-full h-full rounded-lg' />
                                </div>
                                <div className='w-[80%] h-[100px] gap-1.5 capitalize'>
                                    <h1 className='w-[90%] truncate'>
                                        {`IN ${cardDetails.landMark} ,${cardDetails.city}`}
                                    </h1>
                                    <h1 className='w-[90%] truncate'>
                                        {`IN ${cardDetails.title} `}
                                    </h1>
                                    <h1 className='w-[90%] truncate'>
                                        {`IN ${cardDetails.category} `}
                                    </h1>
                                    <h1 className='flex items-center justify-start gap-1.5'>
                                        <FaStar className='text-[#eb6262]' />
                                        {cardDetails.ratings}
                                    </h1>
                                </div>
                            </div>
                            <div className='w-[95%] h-[60%] border-[1px] border-[#dedddd] rounded-lg flex justify-start items-start p-5 gap-3 flex-col'>
                                <h1 className='text-xl font-semibold'>Booking Price-</h1>
                                <p className='w-full flex justify-between items-center px-5 '>
                                    <span className='font-semibold'>{`₹${cardDetails.rent} X ${night} Nights`}</span>
                                    <span>₹{cardDetails.rent * night}</span>
                                </p>
                                <p className='w-full flex justify-between items-center px-5 '>
                                    <span className='font-semibold'>Tax</span>
                                    <span>₹{cardDetails.rent * (7 / 1000)}</span>
                                </p>
                                <p className='w-full flex justify-between items-center px-5 border-b-[1px] border-gray-500 pb-2.5'>
                                    <span className='font-semibold'>AirBnb</span>
                                    <span>₹{cardDetails.rent * (7 / 1000)}</span>
                                </p>
                                <p className='w-full flex justify-between items-center px-5'>
                                    <span className='font-semibold'>Total Price</span>
                                    <span>₹{total}</span>
                                </p>

                            </div>

                        </div>

                    </div>
                }
            
        </div>

    )
}

export default ViewCard