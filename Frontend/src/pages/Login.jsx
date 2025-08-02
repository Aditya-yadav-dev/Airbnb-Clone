import React, { useState, useContext } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { AuthDataContext } from '../context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
const Login = () => {
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { ServerUrl, loading, setloading } = useContext(AuthDataContext)
  const { userData, setuserData } = useContext(userDataContext)
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const response = await axios.post(ServerUrl + '/api/auth/login', {
        email,
        password
      }, { withCredentials: true })
      setuserData(response.data)
      setloading(false)
      toast.success('Login Successfully')
      navigate('/');

    } catch (error) {
      setloading(false)
      toast.error('Login faild')
      console.log(error)
    }

  }

  return (
    <div className='w-screen h-screen flex justify-center items-center relative'>
      <div onClick={() => { navigate('/') }} className='w-12 h-12 cursor-pointer absolute bg-red-600 text-white flex items-center justify-center left-15 top-10 rounded-full'>
        <FaArrowLeft className='text-white text-3xl' />
      </div>
      <form onSubmit={(e) => { handlelogin(e) }} className='max-w-[900px] w-[90%] h-[600px] p-5 flex flex-col justify-center gap-3 items-center md:items-start'>
        <h1 className='text-black text-3xl'>Welcome to AirBnb</h1>
        <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
          <label htmlFor="email" className='text-xl'>Email:</label>
          <input type="text" value={email} onChange={(e) => { setemail(e.target.value) }} className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-lg px-2.5' />
        </div>
        <div className='w-[90%] flex flex-col justify-center items-start gap-2.5'>
          <label htmlFor="password" className='text-xl'>Password:</label>
          <div className='w-[90%] h-[40px] flex items-center gap-1 border-2 border-[#555656] rounded-lg text-lg'>
            <input type={`${show ? "text" : "password"}`} value={password} onChange={(e) => { setpassword(e.target.value) }} className='w-[90%] h-full text-lg px-2.5 outline-none' />
            {show ? <IoIosEyeOff className='text-2xl cursor-pointer' onClick={() => { setshow(false) }} /> :
              <IoIosEye className='text-2xl cursor-pointer' onClick={() => { setshow(true) }} />
            }
          </div>
        </div>

        <button className='bg-red-600 text-xl text-white px-12 py-2.5 mt-3.5 md:px-24 hover:bg-red-500 cursor-pointer rounded-lg' disabled={loading}>{loading ? 'Logining...' : 'Login'}</button>
        <p className='text-[16px]'>Create new Account? <span className='text-18px text-blue-600 cursor-pointer' onClick={() => { navigate('/signup') }}>Signup</span></p>
      </form>

    </div>
  )
}

export default Login