import './App.css';
import Nav from './components/nav';
import Login from './components/log';
import Register from './components/register';
import { createBrowserRouter, RouterProvider, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Home from './components/homepage';
import React, { useState } from 'react';
import Calc from './components/calculator';
import Main from './components/main';

// Error boundary component
function ErrorPage() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1>Oops! 404</h1>
          <p>Sorry, the page you're looking for doesn't exist.</p>
          <a href="/" style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            backgroundColor: '#1e88e5', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px' 
          }}>
            Go Home
          </a>
        </div>
      );
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>Oops! Something went wrong</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <a href="/" style={{ 
        marginTop: '20px', 
        padding: '10px 20px', 
        backgroundColor: '#1e88e5', 
        color: 'white', 
        textDecoration: 'none', 
        borderRadius: '5px' 
      }}>
        Go Home
      </a>
    </div>
  );
}

function App() {
  const [mode, setmode] = useState('light')
  
  const togglemode = () => {
    if(mode === 'light'){
      setmode('dark');
    }
    else{
      setmode('light');
    }
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div><Nav mode={mode} togglemode={togglemode}/><Home mode={mode}/></div>,
      errorElement: <ErrorPage />
    },
    {
      path: '/log',
      element: <div><Nav mode={mode} togglemode={togglemode}/> <Login mode={mode}/></div>,
      errorElement: <ErrorPage />
    },
    {
      path: '/register',
      element: <div><Nav mode={mode} togglemode={togglemode}/> <Register mode={mode}/></div>,
      errorElement: <ErrorPage />
    },
    {
      path: '/calculator',
      element: <div><Nav mode={mode} togglemode={togglemode}/> <Calc mode={mode}/></div>,
      errorElement: <ErrorPage />
    },
    {
      path: '/main',
      element: <div><Nav mode={mode} togglemode={togglemode}/> <Main mode={mode}/></div>,
      errorElement: <ErrorPage />
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
