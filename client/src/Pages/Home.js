import React from 'react'
import "../App.css";
import { BsListCheck } from 'react-icons/bs';
import { GiBookshelf } from 'react-icons/gi';
import { FaRegClock } from 'react-icons/fa';

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
      <div className="showcase">
      <div className="statement-container">
        <h1>We give you the tools to help you achieve.</h1>
      </div>
        <div className="habitShowcase">
          <GiBookshelf className='showcase-icons'/>
          <h1>Habit tracker</h1>
          <p>Create you own list of habits you want to adhere by daily and check them off when you complete them! See how long of a streak you can keep by following them </p>
        </div>
        <div className="todoShowcase">
          <BsListCheck className='showcase-icons'/>
          <h1>To Do List</h1>
          <p>Got something to do today? Write it down with our to do list so you won't forget!</p>
        </div>
        <div className="pomodoroShowcase">
          <FaRegClock className='showcase-icons'/>
          <h1>Pomodoro</h1>
          <p>Stay focused utilizing the pomodoro method and our custom timer! Can you complete the 4 sessions of focus? </p>
        </div>
      </div>
    </div>
  )
}

export default Home