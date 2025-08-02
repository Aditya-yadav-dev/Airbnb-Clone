import React,{useState} from 'react'
import { createContext } from 'react';

export const AuthDataContext = createContext();
const AuthContext = ({children}) => {
  const [loading, setloading] = useState(false)
  const ServerUrl = 'http://localhost:3000';
  let value = {
    ServerUrl, loading, setloading
  }
  
  return (
   <AuthDataContext.Provider value={value}>
     {children}
   </AuthDataContext.Provider>
  )
}

export default AuthContext