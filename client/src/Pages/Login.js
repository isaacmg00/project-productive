import React from 'react'
import "../App.css";

function Login() {
  return (
    <div className='signup-page'>
    <div className="card">
       <div className='signup'>
       <label><b>Email</b></label>
       <input type="text" placeholder="Enter Email"required />
       <label><b>Password</b></label>
       <input type="text" placeholder="Enter your password"required />

 <button type="submit">Login</button>
       </div>
     </div>
   
 </div>
  )
}

export default Login