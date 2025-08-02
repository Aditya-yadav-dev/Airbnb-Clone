import React, { createContext, useContext,useState,useEffect } from 'react'

import { AuthDataContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const listingDataContext = createContext();

const ListingContext = ({ children }) => {
    const navigate = useNavigate();
    const { ServerUrl } = useContext(AuthDataContext);
    const [title, settitle] = useState("")
    const [description, setdescription] = useState('')
    const [city, setcity] = useState('')
    const [landMark, setlandMark] = useState('')
    const [rent, setrent] = useState('')
    const [category, setcategory] = useState('')
    const [frontEndImage1, setfrontEndImage1] = useState(null)
    const [frontEndImage2, setfrontEndImage2] = useState(null)
    const [frontEndImage3, setfrontEndImage3] = useState(null)
    const [backendImage1, setbackendImage1] = useState(null)
    const [backendImage2, setbackendImage2] = useState(null)
    const [backendImage3, setbackendImage3] = useState(null)
    const [Adding, setAdding] = useState(false)
    const [updating, setupdating] = useState(false)
    const [deleting, setdeleting] = useState(false)
    const [listingData, setlistingData] = useState([])
    const [newListingData, setnewListingData] = useState([])
    const [cardDetails, setcardDetails] = useState(null)
    const [searchData, setsearchData] = useState([])
    const handleAddListing = async () => {
        try {
            setAdding(true)
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('city', city)
            formData.append('landMark', landMark)
            formData.append('rent', rent)
            formData.append('category', category)
            formData.append('image1', backendImage1)
            formData.append('image2', backendImage2)
            formData.append('image3', backendImage3)
            let response = await axios.post(ServerUrl+'/api/listing/add',
                formData,
                {withCredentials: true}
            );
            navigate('/')
            setAdding(false)
            toast.success('Listing added Successfully')
            // console.log(response)
            settitle('')
            setdescription('')
            setrent('')
            setcategory('')
            setlandMark('')
            setcity('')
            setfrontEndImage1(null)
            setfrontEndImage2(null)
            setbackendImage1(null)
            setbackendImage2(null)
            setbackendImage3(null)
        } catch (error) {
            setAdding(false)
            toast.error('List Adding Error')
        //    console.log(error)
        }
    }

    const handleGetListing = async () => { 
        try {
            let response = await axios.get(ServerUrl+'/api/listing/getlisting',{withCredentials:true});
            setnewListingData(response.data)
            // console.log('getlisting',response.data);
            setlistingData(response.data)
        } catch (error) {
            console.log(error);
        }
     }

     const handleViewCard = async(id) => { 
          try {
           let response = await axios.get(ServerUrl+`/api/listing/findlisting/${id}`,{withCredentials:true})
           console.log('find listing',response.data)
           setcardDetails(response.data)
           navigate('/viewcard')
          } catch (error) {
           console.log('find listing error',error)
          }
      }
     
      const handleSearch = async (searchVal) => {
        try {
            // console.log(searchVal)
            const response = await axios.get(ServerUrl+`/api/listing/search/?query=${searchVal}`,{withCredentials:true})
            // console.log('Search data is:',response.data)
            setsearchData(response.data)
        } catch (error) {
            setsearchData(null)
            // console.log(error)
        }
      }
     
     useEffect(() => {
         handleGetListing()
        }, [Adding,updating,deleting])
        

      const value = {
       title, settitle,description, setdescription,city, setcity,landMark, setlandMark,rent, setrent,category, setcategory,
       frontEndImage1, setfrontEndImage1,frontEndImage2, setfrontEndImage2,frontEndImage3, setfrontEndImage3,
       backendImage1, setbackendImage1,backendImage2, setbackendImage2,backendImage3, setbackendImage3,handleAddListing,Adding, setAdding,
       listingData, setlistingData,handleGetListing,newListingData, setnewListingData,handleViewCard, cardDetails, setcardDetails,updating, setupdating
       ,deleting, setdeleting, searchData, setsearchData, handleSearch
    }

    return (
        <listingDataContext.Provider value={value}>
            {children}
        </listingDataContext.Provider>
    )
}

export default ListingContext