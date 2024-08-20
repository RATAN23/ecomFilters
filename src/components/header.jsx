import React from 'react'
import { ShoppingCartState } from '../context/context'

const Header = () => {

  const {
    filterState : {searchQuery},
    filterDispatch,
  } = ShoppingCartState();

  return (
   <nav className='h-12 flex items-center justify-between'>
    <h2 className='ml-2 text-2xl'>
        Ratan' Store
    </h2>
    <input type="text" placeholder='Search a Product..,' className='mr-2 border-2 border-gray-500'
      value = {searchQuery}
      onChange={(e) => {
          filterDispatch({
            type : "FILTER_BY_SEARCH",
            payload : e.target.value,
          })
      }}
    ></input>
   </nav>
  )
}

export default Header
