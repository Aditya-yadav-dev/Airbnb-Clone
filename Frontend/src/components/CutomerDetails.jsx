import axios from 'axios'
import React,{useEffect,useContext, useState} from 'react'
import { AuthDataContext } from '../context/AuthContext'

const CutomerDetails = ({bookingId}) => {
  const {ServerUrl} = useContext(AuthDataContext)
  const [customerData, setcustomerData] = useState(null)
  const fetchData = async () => {
     try {
          const response = await axios.get(ServerUrl+`/api/booking/getbooking/${bookingId}`,{withCredentials:true})
          // console.log(response.data)
          setcustomerData(response.data)
       } catch (error) {
        console.log(error)
       }
  }
    useEffect(() => {
      fetchData()
    }, [])
  
    
      if (!customerData) return null; 

  return (
    
    <div className="max-w-md mx-auto h-[300px] flex flex-col justify-start items-center bg-white shadow-lg rounded-2xl p-5 border">
  <h2 className="text-2xl font-semibold mb-5 text-gray-800">Customer Details</h2>

<div className='flex flex-col gap-3.5'>
  <div className="w-full flex justify-start items-center gap-2.5">
    <p className="text-sm text-gray-500">Name</p>
    <p className="text-lg font-medium text-gray-700"> {customerData.guest.name}</p>
  </div>

  <div className="w-full flex justify-start items-center gap-2.5">
    <p className="text-sm text-gray-500">Email</p>
    <p className="text-lg font-medium text-gray-700">{customerData.guest.email}</p>
  </div>

  <div className="flex flex-col justify-between gap-4">
    <div className="w-full flex justify-start items-center gap-2.5">
      <p className="text-sm text-gray-500">Check-in</p>
      <p className="text-lg font-medium text-nowrap text-green-600">{(customerData.checkIn).split('T')[0]}</p>
    </div>
    <div className="w-full flex justify-start items-center gap-2.5">
      <p className="text-sm text-gray-500">Check-out</p>
      <p className="text-lg font-medium text-red-600">{(customerData.checkOut).split('T')[0]}</p>
    </div>
  </div>
  </div>
</div>

  )
}

export default CutomerDetails