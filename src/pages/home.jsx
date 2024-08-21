import React, { useMemo, useState } from 'react'
import { ShoppingCartState } from '../context/context'
import Pagination from '../components/pagination';
import Rating from '../components/rating';
import Filters from '../components/filters';

const Home = () => {
  const [page , setPage] = useState(1);
  const [totalPages ,setTotalPages] = useState(0);

  const {
    state : {products , cart},
    dispatch,
    filterState : { sort , byStock , byRating , searchQuery }
  } = ShoppingCartState();
   
  const filteredProducts = useMemo(() =>{
    let filteredProducts = products;

    if(sort){
      filteredProducts = filteredProducts.sort((a,b) => {
         return sort=== 'lowToHigh' ? a.price - b.price : b.price - a.price;
      })
    }

    if(byStock){
      filteredProducts = filteredProducts.filter((item) => {
        return item.stock === 0;
      })
    }

    if(byRating != "0"){
      filteredProducts = filteredProducts.filter((item) => {
        return Math.round(item.rating) === byRating;
      })
    }

    if(searchQuery.length >0 ){
      filteredProducts = filteredProducts.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
      })
    }
   
    return filteredProducts;
  },[sort , byStock , byRating , searchQuery , products]);

  return (
    <div>
      <div className='py-9 flex'>
     {/* <Filters/>  */}
     {
        filteredProducts.length >0 && (
          <div className='m-[20px] w-screen p-0 grid grid-cols-3 gap-9'>
            {  filteredProducts?.slice(page*10 - 10, page*10).map((prod) => {
                const inCart = cart.some(p => p.id === prod.id);
                return (<span className='h-[280px] w-[90%] p-[50px] border-4 text-center items-center border-gray-300 cursor-pointer ' key={prod.id}>
                <img className = "w-[90%] h-[55%] object-fill" src = {prod.thumbnail} alt={prod.title}></img>
                <span>{prod.title}</span>
                <hr/>
                <span>{prod.price}</span>
                <Rating rating={Math.round(prod.rating)}/>
                <button className={`px-2 mt-2 ${!inCart ? "bg-orange-400" : "bg-blue-400"} rounded-md  ${prod.stock == 0 ? "opacity-50" : ""}`}
                disabled = {prod.stock == 0}
                onClick={()=>{
                  dispatch({
                    type : inCart ? "REMOVE_FROM_CART" : "ADD_TO_CART",
                    payload : prod,
                  })
                }}
                > 
                  {prod.stock > 0 ? !inCart ? "Add to Cart" : "Remove from Cart" : "Out of Stock" }</button>
                </span>)
              })}
          </div>
        )}
        </div>
        {
          filteredProducts.length > 0 && (
            <Pagination
            products={filteredProducts}
            page = {page}
            setPage = {setPage}
            totalPages={totalPages}
            />
          )
        }
  </div>
  )
}

export default Home
