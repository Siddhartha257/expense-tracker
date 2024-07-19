import React from 'react'
import { NavLink } from 'react-router-dom'
export default function nav(props) {
  return (
    <div>
            <nav className= 'navbar navbar-expand-lg navbar-dark' style={{backgroundColor: props.mode==='dark'?'#13315c':'#1e88e5'}}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Xpense Master</NavLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/main">Home</NavLink>
            </li>
          </ul>
          <NavLink to='/register'><button type="button" class="btn btn-outline-light mx-2">Register</button></NavLink>
          <NavLink to='/log'> <button type="button" class="btn btn-outline-light mx-3">Login</button></NavLink>
          <NavLink to={'/calculator'} style={{margin:'0px 0px 0px 5px', color:'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calculator" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
            </svg></NavLink>
            <div class="form-check form-switch">
              <NavLink  id="flexSwitchCheckDefault" onClick={props.togglemode}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-circle-half" viewBox="0 0 16 16" style={{color:'white'}}>
                <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>
              </svg></NavLink>
              {/* <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={props.togglemode}/>
            <label class="form-check-label" for="flexSwitchCheckDefault" style={{color: props.mode==='dark'?'white':'white', fontSize:'12px'} }>Enable Dark Mode</label> */}
          </div>
        </div>
      </div>
    </nav>
   </div>
  )
}
