import React from 'react'
import { Link } from "react-router-dom";
import Button from '../Button/Button';
import './Navbar.css';

function NavBar() {
  return (
    <nav >
      <ul class="nav-list">
        <li className="nav-item">
          <Link to="/">
            <img src={require("../../Assets/logo.png")} 
            alt="logo" className='icon' title='Home' /></Link>
        </li>
        <li className="nav-item">
          <Link to="/Habit-tracker">Habit Tracker</Link>
        </li>
        <li className="nav-item">
          <Link to="/ToDoPage">To Do List</Link>
        </li>
        <li className="nav-item">
          <Link to="/Pomodoro">Pomodoro</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-item">
        <Link to="/signup"><Button/></Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar