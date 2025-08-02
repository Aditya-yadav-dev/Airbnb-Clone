import React, { useState, useContext } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { AuthDataContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { ServerUrl, loading, setloading } = useContext(AuthDataContext)

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const response = await axios.post(ServerUrl + '/api/auth/signup', {
        name,
        email,
        password
      }, { withCredentials: true })
      console.log(response.data)
      setloading(false)
      toast.success('SignUp Succesfully Successfully')
      navigate('/')
    } catch (error) {
      setloading(false)
      toast.error('SignUp faild')
      console.log(error)
    }

  }



  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div onClick={() => { navigate('/home') }} className='w-12 cursor-pointer h-12 absolute bg-red-600 text-white flex items-center justify-center left-15 top-10 rounded-full'>
        <FaArrowLeft className='text-white text-3xl' />
      </div>
      <form onSubmit={(e) => { handleSignup(e) }} className='max-w-[900px] w-[90%] h-[600px] p-5 flex flex-col justify-center gap-3 items-center md:items-start'>
        <h1 className='text-black text-3xl'>Welcome to AirBnb</h1>
        <div className='w-[90%] flex flex-col justify-center items-start gap-2.5 mt-8'>
          <label htmlFor="name" className='text-xl'>UserName:</label>
          <input type="text" value={name} onChange={(e) => { setname(e.target.value) }} className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
        </div>
        <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
          <label htmlFor="email" className='text-xl'>Email:</label>
          <input type="text" value={email} onChange={(e) => { setemail(e.target.value) }} className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
        </div>
        <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
          <label htmlFor="password" className='text-xl'>Password:</label>
          <div className='w-[90%] h-[40px] flex items-center gap-1 overflow-hidden border-2 border-[#555656] rounded-lg text-lg'>
            <input type={`${show ? "text" : "password"}`} value={password} onChange={(e) => { setpassword(e.target.value) }} className='w-[90%] h-full text-lg px-2.5 outline-none' />
            {show ? <IoIosEyeOff className='text-2xl cursor-pointer' onClick={() => { setshow(false) }} /> :
              <IoIosEye className='text-2xl cursor-pointer' onClick={() => { setshow(true) }} />
            }
          </div>
        </div>

        <button className='bg-red-600 text-xl text-white px-12 py-2.5 mt-3.5 md:px-24 hover:bg-red-500 cursor-pointer rounded-lg' disabled={loading} >{loading ? 'Signing...' : 'SignUp'}</button>
        <p className='text-[16px]'>Already have an Account? <span className='text-[18px] text-blue-600 cursor-pointer' onClick={() => { navigate('/login') }}>Login</span></p>
      </form>

    </div>
  )
}

export default SignUp