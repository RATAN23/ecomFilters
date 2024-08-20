import React, { startTransition } from 'react'
import { useState } from 'react';

const Rating = ({size = 5 , rating , onChange}) => {
  
   const [hoveredRating , setHoveredRating] = useState(0);

  const handleMouseHover = (starRating) => {
        if(onChange)
         setHoveredRating(starRating); 
  }
  

  return (
    <div className='star-rating'>
      {Array(size ).fill("").map((_,index) => {
        const starValue  = index + 1;
        let starClass = "star";

        if(hoveredRating >= starValue){
            starClass += " hover";
        } else
        if(rating >= starValue){
            starClass += " active";
        }


        return (
            <>
                 <span key= {index} className={starClass}
                  onClick ={() => {
                    onChange(starValue)
                  }}
                  onMouseEnter={() => {
                    if(onChange)
                    handleMouseHover(starValue)
                  }}
                  onMouseLeave={() => {
                    if(onChange)
                      handleMouseHover(0)
                  }} 
                 >
                    &#9733;
                 </span>
            </>
        )
      })}
    </div>
  )
}

export default Rating;




