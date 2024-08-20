import React, { useEffect } from 'react'
import { ShoppingCartState } from '../context/context'
import Rating from './rating';
import { useSearchParams } from 'react-router-dom';

const filterMap = {
  sort : "SORT_BY_PRICE",
  byRating : "FILTER_BY_RATING",
  byStock : "FILTER_BY_STOCK",
  searchQuery : "FILTER_BY_SEARCH",
};

const Filters = () => {

  const { filterState, filterDispatch } = ShoppingCartState();
  const { byStock, sort, byRating } = filterState;

  let [searchParams , setSearchParams] = useSearchParams();

  
  useEffect(() => {
    if (searchParams.size) {
      searchParams.forEach((value, key) => {
        filterDispatch({
          type: filterMap[key],
          payload: value,
        });
      });
    }
  }, []);

  useEffect(() => {
    setSearchParams(filterState);
  }, [filterState]);


  return (
    <div className='flex flex-col w-96 gap-2'>
      <span className='font-bold text-xl'>Filter Products</span>
      <span className='my-1'>
        <input type="radio" className='mr-2' id="Ascending"
          name="sort"
          onChange={() =>
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })}
          checked={sort === "lowToHigh" ? true : false}
        ></input>
        <label htmlFor='Ascending'>Ascending</label>
      </span>
      <span>
        <input type="radio" className='mr-2' id="Descending"
          name="sort"
          onChange={() =>
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })}
          checked={sort === "highToLow" ? true : false}
        >
        </input>
        <label htmlFor='Descending'>Descending</label>
      </span>
      <hr></hr>
      <span className='my-1'>
      <input type="checkbox" className='mr-2' id="outofStock"
          name="outofStock"
          onChange={() =>
            filterDispatch({
              type: "FILTER_BY_STOCK",
              payload: !byStock,
            })}
          checked={byStock}
        >
        </input>
        <label htmlFor='outofStock'>Include Out of Stock</label>
      </span>
      <hr></hr>
      <span className='my-2 flex items-center'>
            <label className='pr-2'>Rating</label>
            <Rating 
             rating={byRating}
              onChange={(i) => {
                filterDispatch({
                  type: "FILTER_BY_RATING",
                  payload: i,
                })
              }}
            />
      </span>
      <hr></hr>
      <button className='my-2 bg-slate-400 text-white rounded-sm'
      onClick={() => {
        filterDispatch({
          type: "CLEAR_FILTERS",
        })
      }}
      >
        Clear Filters
      </button>

    </div>
  )
}

export default Filters
