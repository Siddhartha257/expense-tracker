import React from 'react'

export default function m2() {
  return (
    <>
    <div className='con' style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center', margin:'10px', marginTop:'3rem', height:'86vh'}}>
    <h1 style={{marginBottom:'50px'}}> Expense Tracker</h1>
    <div class="input-group input-group-md" style={{width:'450px'}}>
    <select className="form-select form-select-md" aria-label=".form-select-lg example" style={{width:'150px'}}>
        <option selected>~Type</option>
        <option value="1">Income</option>
        <option value="2">Expense</option>
    </select>
        <input type="text" className="form-control " aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{width:'300px'}}/>
    </div>

    <div class="input-group mx-3 my-3" style={{width:'450px'}}>
    <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)"/>
        <span class="input-group-text">$</span>
    </div>

    <input type="date" style={{width:'200px'}} className='my-3'/>
    <input type="time" style={{width:'200px'}} className='my-3'/>

    <button className='btn btn-outline-success mx-3 my-3' style={{width:'400px'}}>Add</button>
    </div>
    </>
  )
}
