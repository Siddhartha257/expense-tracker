
import './App.css';
import Nav from './components/nav';
import Login from './components/log';
import Register from './components/register';
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Home from './components/homepage';
import React, { useState } from 'react';
import Calc from './components/calculator';

import Main from './components/main';

function App() {
  const [mode,setmode]= useState('light')
  
  const togglemode=()=>{
    if(mode==='light'){
      setmode('dark');
    }
    else{
      setmode('light');
    }
  }
  const router = createBrowserRouter([
      {
        path:'/',
        element:<> <Nav mode={mode} togglemode={togglemode}/><Home mode={mode}/></>
      },
      {
        path:'/log',
        element:<> <Nav mode={mode} togglemode={togglemode}/> <Login mode={mode}/></>
      },
      {
        path:'/register',
        element:<> <Nav mode={mode} togglemode={togglemode}/> <Register mode={mode}/></>
      },
      {
        path:'/calculator',
        element:<> <Nav mode={mode} togglemode={togglemode}/> <Calc mode={mode}/></>
      },
      {
        path:'/main',
        element:<> <Nav mode={mode} togglemode={togglemode}/> <Main mode={mode}/></>
      },

    ])
  return (
   <>
     <RouterProvider router={router}/>

   </>
  );


}
export default App;
