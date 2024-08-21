import './App.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/app-layout';
import Home from './pages/home';
import Context from './context/context';
import Cart from './pages/cart';

function App() {
 
  const router = createBrowserRouter([
    {
      element: <AppLayout/>,

      children: [
        {
          path : '/',
          element : <Home/>
        },
        {
          path : '/cart',
          element : <Cart/>
        }
      ]
    }
  ]);

  return (
    <>
    <Context>
        <RouterProvider router ={router}/>
    </Context>
      
    </>
  )
}

export default App
