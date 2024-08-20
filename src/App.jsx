import './App.css'
import { BrowserRouter, Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/app-layout';
import Home from './pages/home';
import Context from './context/context';

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
