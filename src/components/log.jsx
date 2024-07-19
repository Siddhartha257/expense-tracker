import React from 'react'
import './login.css';
import { NavLink} from 'react-router-dom';
export default function login(props) {
    if(props.mode==='dark'){
        document.body.style.background="#134074"
    }
    else{
        document.body.style.background="#1e88e5"
    }
  return (
    <div class="container">
        <div class="details">
            <h3>SIGN IN</h3>
            <input type="email" placeholder="Email Address" id="email1"/>
            <br/>
            <input type="password" placeholder="Password" id="password1"/>
            <br/>
            <button class="btn btn-primary button">Login</button>
            <p style={{color:'black'}}>DON'T HAVE AN ACCOUNT ? <NavLink to="/register"> REGISTER</NavLink></p>
        </div>
        <div class="image">
            <img src="https://media.istockphoto.com/id/1279952311/vector/electronic-documentation-vector-concept-metaphor.jpg?s=612x612&w=0&k=20&c=HHql3BU8fEqaFE2JBgjPB6Grp7EkmeoZ42vi8IIFEUI=" alt=""/>
        </div>
    </div>
  )
}
