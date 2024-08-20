import React, { useMemo, useState } from 'react'
import { ShoppingCartState } from '../context/context'
import Pagination from '../components/pagination';
import Rating from '../components/rating';
import Filters from '../components/filters';

const Home = () => {
  const [page , setPage] = useState(1);
  const [totalPages ,setTotalPages] = useState(0);

  const {
    state : {products},
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
    console.log(filteredProducts);
    return filteredProducts;
  },[sort , byStock , byRating , searchQuery , products]);

  return (
    <div>
      <div className='py-9 flex'>
     <Filters/> 
     {
        filteredProducts.length >0 && (
          <div className='m-[20px] w-screen p-0 grid grid-cols-3 gap-9'>
            {  filteredProducts?.slice(page*10 - 10, page*10).map((prod) => {
                return (<span className='h-[300px] w-[90%] p-[50px] border-4 text-center items-center border-gray-300 cursor-pointer ' key={prod.id}>
                <img className = "w-[100%] h-[85%] mb-[3px] object-cover" src = {prod.thumbnail} alt={prod.title}></img>
                <span>{prod.title}</span>
                <hr/>
                <span>{prod.price}</span>
                <Rating rating={Math.round(prod.rating)}/>
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
