import React from 'react'
import './homepage.css'
import { NavLink } from 'react-router-dom'
export default function homepage(props) {

    if(props.mode==='dark'){
      document.body.style.backgroundColor='white'
    }
    else{
        document.body.style.background='white'
    }
  return (
    <div>
       <div className="content" style={{backgroundColor:props.mode==='dark'?'#134074':'#1e88e5'}}>
                <img src= {require('./logo.png')}alt="" style={{width:'200px',height:'200px',borderRadius:'50%'}}/>
                <div className="details"><h1 id="he">Xpense Master!</h1>
                <p> <strong>Manage your personal finances and easily track your money, expenses and budget</strong></p></div>
            </div>
            <div className="main-down" style={{backgroundColor:props.mode==='dark'?'#134074':'#1e88e5'}}>
              <NavLink to='/main'>  <button type="button" className="btn btn-lg" id="btn">Try now !!!</button></NavLink>
            </div>
      <div className="next-main" id="featu" style={{backgroundColor:props.mode==='dark'?'#014f86':'white', color: props.mode==='dark'?'white':'black'}}>
        <h2>Overview</h2>
        <p style={{color: props.mode==='dark'?'white':'black'}}>Visualize the flow of your money at a glance with a fully customizable Overview page.
            Here you can find the balance of your last days together with the accounts, cards and budgets you use most frequently.</p>
            <img src={require('./preview.jpeg')} alt="" />
      </div>
      <div className="next-main main2" style={{backgroundColor: props.mode==='dark'?'#134074':'#e0edf4',color: props.mode==='dark'?'white':'black'}}>
        <h2>Tips & Tricks</h2>
        <p style={{color: props.mode==='dark'?'white':'black', fontSize:'20px'}}>"Here are some helpful tips and tricks to make your task easier."</p>
            <img src={require('./tips.jpeg')} alt="" />
      </div>
      <div className="pricing">
        <div className="pricing-head" style={{color:'black'}}>
          <h1>Unlock the full potential</h1>
          <p>Want to simplify your financial life? Our personal expense manager does the hard work for you, so you can focus on what matters most</p>
        </div>
        <div className="pricing-plans" id="price" style={{color:'black'}}>
          <div className="plan free">
            <h3>Free Plan</h3>
            <div className="features">
              <div className="icon"><img src="https://i.pngimg.me/thumb/f/720/m2i8G6b1K9i8H7K9.jpg" alt="" className='ic'/></div>
              <div className="det">Unlimited expense entries</div>
            </div>
            <div className="features">
              <div className="icon"><img src="https://i.pngimg.me/thumb/f/720/m2i8G6b1K9i8H7K9.jpg" alt="" className='ic'/></div>
              <div className="det">Advanced budget tracking tools.</div>
            </div>
            <div className="features">
              <div className="icon"><img src="https://i.pngimg.me/thumb/f/720/m2i8G6b1K9i8H7K9.jpg" alt="" className='ic'/></div>
              <div className="det">No ads</div>
            </div>
            <button type="button" className="btn btn-outline-success">$0</button>
          </div>
          <div className="plan basic" style={{color:'black'}}>
            <h3>Basic Plan</h3>
            <div className="features">
              <div className="icon"><img src="https://i.pngimg.me/thumb/f/720/m2i8G6b1K9i8H7K9.jpg" alt=""className='ic'/></div>
              <div className="det">Unlimited expense entries</div>
            </div>
            <div className="features">
              <div className="icon"><img src="https://image.similarpng.com/very-thumbnail/2020/11/Hand-drawn-correct-icon-on-transparent-background-PNG.png" alt="" className='ic'/></div>
              <div className="det">Advanced budget tracking tools.</div>
            </div>
            <div className="features">
              <div className="icon"><img src="https://image.similarpng.com/very-thumbnail/2020/11/Hand-drawn-correct-icon-on-transparent-background-PNG.png" alt="" className='ic'/></div>
              <div className="det">No ads</div>
            </div>
            <button type="button" className="btn btn-outline-success">$50</button>
          </div>
      
          <div className="plan premium" style={{color:'black'}}>
            <h3 style={{color:'black'}}>Premium Plan</h3>
            <div className="features" >
              <div className="icon"><img src="https://image.similarpng.com/very-thumbnail/2020/11/Hand-drawn-correct-icon-on-transparent-background-PNG.png" alt="" className='ic' /></div>
              <div className="det">Unlimited expense entries</div>
            </div>
            <div className="features">
              <div className="icon"><img src="https://image.similarpng.com/very-thumbnail/2020/11/Hand-drawn-correct-icon-on-transparent-background-PNG.png" alt="" className='ic'/></div>
              <div className="det">Advanced budget tracking tools.</div>
            </div>
            <div className="features">
              <div className="icon"><img src="https://image.similarpng.com/very-thumbnail/2020/11/Hand-drawn-correct-icon-on-transparent-background-PNG.png" alt="" className='ic'/></div>
              <div className="det">No ads</div>
            </div>
            <button type="button" className="btn btn-outline-success">$100</button>
          </div>
        </div>
      </div>
      </div>
  )
}
