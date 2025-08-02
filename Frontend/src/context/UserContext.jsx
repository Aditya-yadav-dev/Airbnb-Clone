import React, { createContext,useState, useEffect, useContext} from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'
 export const userDataContext = createContext()

const UserContext = ({children}) => {
    const [userData, setuserData] = useState(null)
     const {ServerUrl} = useContext(AuthDataContext)
    const getCurrentUser = async () => { 
      try {
          const response = await axios.get(ServerUrl+'/api/user/getcurrentuser',{withCredentials:true})
          setuserData(response.data)
          // console.log('current user is',response.data)
      } catch (error) {
        console.log('Get current user error:',error)
      }       
     }

    const value = {
      userData, setuserData, getCurrentUser
    }

    useEffect(() => {
         getCurrentUser()
    }, [])
    
//  useEffect(() => {
//    console.log('user data id',userData)
//   }, [userData])
  
  return (
    <userDataContext.Provider value={value}>
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext