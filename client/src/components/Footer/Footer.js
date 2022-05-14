import React from 'react'
import { Link } from "react-router-dom";
import Button from '../Button/Button';
import "./Footer.css";


function Footer() {
  return (
    <div>
        <footer>
         <div className="footer-container">
            <ul>
                <li className="footer-item"><Link to="/">Home</Link> </li>
                <li className="footer-item"><Link to="/Habit-tracker">Habit Tracker</Link> </li>
                <li className="footer-item"><Link to="/ToDoPage">To Do List</Link> </li>
                <li className="footer-item"><Link to="/Pomodoro">Pomodoro</Link> </li>
                <li className="footer-item"><Link to="/login">Login</Link> </li>
              
            </ul>
             <p>Don't got an account? Sign Up!</p> 
            <Link to="/signup"><Button/></Link>
            <p>©2022 Project Productive</p>
          </div>
          
          </footer>  
          
    </div>
  )
}

export default Footer