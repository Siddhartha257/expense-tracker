import React from 'react'
import { NavLink } from 'react-router-dom'
import './login.css';
export default function Register(props) {
    if(props.mode==='dark'){
        document.body.style.background="#134074"
    }
    else{
        document.body.style.background="#1e88e5"
    }
  return (
    <div className="container">
    <div className="image">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-4268366-3561009.png" alt=""/>
    </div>
    <div className="details">
        <h3>CREATE AN ACCOUNT</h3>
        <input type="text" placeholder="Name" id="names" required/>
        <br/>
        <input type="email" placeholder="Email Address" id="email" required/>
        <br/>
        <input type="password" placeholder="Password" id="password" required/>
        <br/>
        <button type="button" className="btn btn-primary button" id="Register" >Register</button>
        <p style={{color:'black'}}>ALREADY HAVE AN ACCOUNT? <NavLink to="/log">SIGN IN</NavLink></p>
    </div>
</div>
  );
}
