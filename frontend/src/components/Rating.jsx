import React from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({value,text}) => {

    const style= {
        'color' : 'yellow'
    }
  return (
    <>
    <div >
        <span  style={style}>
            {
                value >= 1?<FaStar/> :value >= 0.5? <FaStarHalfAlt/>:<FaRegStar/>
            }
        </span>
        <span style={style}>
            {
                value >= 2?<FaStar/> :value >= 1.5? <FaStarHalfAlt/>:<FaRegStar/>
            }
        </span>
        <span style={style}>
            {
                value >= 3?<FaStar/> :value >= 2.5? <FaStarHalfAlt/>:<FaRegStar/>
            }
        </span>
        <span style={style}>
            {
                value >= 4?<FaStar/> :value >= 3.5? <FaStarHalfAlt/>:<FaRegStar/>
            }
        </span>
        <span style={style}>
            {
                value >= 5?<FaStar/> :value >= 4.5? <FaStarHalfAlt/>:<FaRegStar/>
            }
        </span>

        <span>{text}</span>
    </div>
    </>
  )
}

export default Rating