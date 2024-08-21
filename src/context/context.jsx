import { createContext, useContext, useEffect, useReducer } from "react";
import { filterReducer, shoppingCartReducer } from "./reducer";

const ShoppingCart = createContext();

const Context = ({children}) => { 
    
    const [state,dispatch] = useReducer(shoppingCartReducer, {
        products : [],
        cart : []
    });

    const [filterState ,  filterDispatch] = useReducer(filterReducer,{
         byStock : false,
         byRating : 5,
         searchQuery : ""
    });
 
    useEffect(() =>{
        fetchProducts();
    }, []);

    const fetchProducts = async()=>{
      const res =  await fetch(`/public/products.json`);
      const data = await res.json();
     
      if(data && data.products){
            dispatch({
                type : 'FETCH_PRODUCTS',
                payload : data.products,
            })
      }
    }

    return (<ShoppingCart.Provider value={{state, dispatch , filterDispatch , filterState}} > {children}</ShoppingCart.Provider>);
  
};

export const ShoppingCartState = ()=>{
    return useContext(ShoppingCart);
}

export default Context;