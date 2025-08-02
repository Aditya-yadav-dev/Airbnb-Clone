import { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './context/UserContext'
import { MyListing } from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'

function App() {
   
   const {userData} = useContext(userDataContext)

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/signup' element={<SignUp />}  />
      <Route path='/login' element={<Login />}  />
      <Route path='/listingpage1' element={userData ? <ListingPage1 /> : <Login /> }  />
      <Route path='/listingpage2' element={userData ? <ListingPage2 /> : <Login /> }  />
      <Route path='/listingpage3' element={userData ? <ListingPage3 /> : <Login /> }  />
      <Route path='/mylisting' element={userData ? <MyListing /> : <Login /> }  />
      <Route path='/viewcard' element={userData ? <ViewCard /> : <Login /> }  />
      <Route path='/mybooking' element={userData ? <MyBooking /> : <Login /> }  />
      <Route path='/booked' element={userData ? <Booked /> : <Login /> }  />
    </Routes>
    
     
    </>
  )
}

export default App
