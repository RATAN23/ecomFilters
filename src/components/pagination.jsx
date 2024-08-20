import React from 'react'

const Pagination = ({page,setPage,products, maxVisiblePages = 5}) => {

    const totalPages = Math.ceil = products.length/10;

  const selectPageHandler = (selectedPage) => {
        if(selectedPage>=1 && selectedPage <= products.length/10 && selectedPage!== page)
          setPage(selectedPage);
    }

    const renderPageKeys = (currPage , key) => {
        return  <span className='bg-[#fff] w-[50px] p-5 text-center border-zinc-500 border-[2px] cursor-pointer' key={key}
        onClick={() =>selectPageHandler(currPage)}
        style = {{backgroundColor : `${page === currPage? '#ccc' : ""}`}}
        >{currPage}</span>
    }

    const renderPageNumbers = () => {
      const pageNumbers = [];

      if(totalPages <= maxVisiblePages) {
        for(let i = 1; i <= totalPages ; i++){
            pageNumbers.push(renderPageKeys(i))
        }
      }else {
        // truncation logic
        const startpage = Math.max(1,page - Math.floor(maxVisiblePages/2));
        const endPage = Math.min(totalPages , startpage + maxVisiblePages - 1);

        if(startpage > 1) {
            if(startpage>2)  pageNumbers.push(renderPageKeys(1));
            pageNumbers.push(renderPageKeys("...","ellipsis-start"))
        }

        for(let i = startpage ; i <= endPage ; i++){
            pageNumbers.push(renderPageKeys(i));
        }

        if(endPage < totalPages){
            pageNumbers.push(renderPageKeys("...","ellipsis-end"));
            if(endPage <totalPages -1  )
               pageNumbers.push(renderPageKeys(totalPages))
        }

      }
      return pageNumbers;
    }
    
    
 

  return (

    <div className='p-[10px] m-[15px 0] flex justify-center'>
    <span className='p-5  border-zinc-500 border-[2px] cursor-pointer'
     onClick={() =>selectPageHandler(page-1)}
     style =  {{opacity : `${page === (1)? '0' : '1'}`}}
    >◀️</span>
     {renderPageNumbers()}
    <span className='p-5 border-zinc-500 border-[2px] cursor-pointer'
      onClick={() =>selectPageHandler(page+1)}
      style =  {{opacity : `${page === (products.length/10)? '0' : '1'}`}}
    >▶️</span>
  </div>

  )
}

export default Pagination
