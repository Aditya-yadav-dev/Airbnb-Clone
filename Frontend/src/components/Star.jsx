import React,{useState} from 'react'
import { FaStar } from 'react-icons/fa';

const Star = ({starVal = 5,onRate}) => {
    const [rating, setrating] = useState(0)
    const [hover, sethover] = useState(0)

  return (
    <div className='flex gap-1'>
        {
            [...Array(starVal)].map((_,index)=>{
                 let starVal = index + 1
                 const isFilled = starVal <= (hover || rating);

                 return(
                    <span key={starVal}
                     onClick={() => { 
                      setrating(starVal)
                      onRate && onRate(starVal)
                      }}
                      onMouseEnter={() => { 
                        sethover(starVal)
                       }}
                       onMouseLeave={() => { 
                        sethover(0)
                        }}
                     
                     >
                        <FaStar className={`cursor-pointer text-2xl ${isFilled ? 'text-yellow-400' : 'text-gray-400'}`} />
                    </span>
                 )

            })
        }
    </div>
  )
}

export default Star