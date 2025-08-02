import React,{useContext,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { listingDataContext } from '../context/ListingContext'
import Card from '../components/Card'
import { bookingDataContext } from '../context/BookingContext'

const Home = () => {
  const {listingData, setlistingData,newListingData, setnewListingData} = useContext(listingDataContext)
    const {showDetailsPopUp, setshowDetailsPopUp } = useContext(bookingDataContext)
  
   useEffect(() => {
       setshowDetailsPopUp(false)
   }, [])
   
  return (
    <div>
      <Navbar />
      <div className='w-full px-1 md:w-[96%] flex z-0 justify-center items-center md:gap-8 gap-1 flex-wrap mt-[250px] md:mt-[180px]'>
      {
        newListingData.map((list) => { 
              return <Card key={list._id} title={list.title} ratings={list.ratings} isBooked={list.isBooked} host={list.host} landMark={list.landMark} city={list.city} image1 ={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} />
         })
      }
      </div>
    </div>
  )
}

export default Home