import React from 'react'
import "../App.css";

function Home() {
  return (
    <div>
      <header class="home-page">

      <div className="top-container">
      <img src={require("../Assets/header-logo.png")} 
            alt="logo" className='logo'  />
         <h1 className="title">Become your best self</h1>
         <div className="background-color"> </div>
      </div>
      </header>
    </div>
  )
}

export default Home