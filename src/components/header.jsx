import React from 'react'
import { ShoppingCartState } from '../context/context'
import { Link } from 'react-router-dom';

const Header = () => {

  const {
    state : {cart},
    filterState : {searchQuery},
    filterDispatch,
  } = ShoppingCartState();

  return (
   <nav className='h-12 flex items-center justify-between'>
    <Link to = '/'>
        <h2 className='ml-2 text-2xl'>
            Flash
        </h2>
    </Link>
    <input type="text" placeholder='Search a Product..,' className='mr-2 px-2 rounded-md border-2 border-black'
      value = {searchQuery}
      onChange={(e) => {
          filterDispatch({
            type : "FILTER_BY_SEARCH",
            payload : e.target.value,
          })
      }}
    ></input>
    <Link to ='/cart'>
        <button className='px-3 border-2 border-black rounded-xl p-1 text-md bg-red-500 text-white'>Cart {cart.length}</button>
    </Link>
   </nav>
  )
}

export default Header
