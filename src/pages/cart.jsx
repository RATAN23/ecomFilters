import React from 'react'
import { ShoppingCartState } from '../context/context'
import Rating from '../components/rating';

const Cart = () => {
  const {
    state : {cart},
    dispatch,
  } = ShoppingCartState();

  return (
    <div className='p-20'>
     {cart?.length > 0 ? (
       <div className='grid grid-rows-3 gap-10'>
        {cart.map((prod) => {
          return (
            <span className='h-full p-10 flex justify-between border-4 text-center items-center border-gray-300 cursor-pointer ' key={prod.id}>
            <img className = "w-48 h-full object-contain" src = {prod.thumbnail} alt={prod.title}></img>
            <span className='font-bold'>{prod.title}</span>
            <hr/>
            <span>${prod.price}</span>
            <Rating rating={Math.round(prod.rating)}/>
            <button className={`px-2 mt-2  bg-blue-400 rounded-md`}
                onClick={()=>{
                  dispatch({
                    type : "REMOVE_FROM_CART",
                    payload : prod,
                  })
                }}
                > 
                  Remove from Cart </button>
            </span>
          )
        })}
       </div> 
     ) : (
      <span className='h-[600px] flex justify-center items-center'>
         <h1 className='font-extrabold text-6xl text-orange-500'>Cart is Empty</h1>
      </span>
     )}
    </div>
  )
}

export default Cart
