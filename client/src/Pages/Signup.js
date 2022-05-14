import React from 'react'
import "../components/Card/Card.css";
function Signup() {
  return (
    <div className='signup-page'>
       <div className="card">
          <div className='signup'>
          <label><b>First Name</b></label>
          <input type="text" placeholder="Enter your first name" name="fistName" required></input>
          <label><b>Email</b></label>
          <input type="text" placeholder="Enter Email"required />
          <label><b>Password</b></label>
          <input type="text" placeholder="Make a password"required />
  
    <button type="submit">Create Account</button>
          </div>
        </div>
      
    </div>
  )
}

export default Signup