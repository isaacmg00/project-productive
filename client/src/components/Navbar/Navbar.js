import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";

const NavBar = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/getName/", {
        method: "GET",
      });
      const parseRes = await response.json();
      setName(parseRes.nam);
    } catch (err) {
      console.error(err.message);
    }
  };
  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); //removes the token from the local storage when a person logs out
    setAuth(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <nav>
      <ul class="nav-list">
        <li className="nav-item">
          <Link to="/">
            <img
              src={require("../../Assets/logo.png")}
              alt="logo"
              className="icon"
              title="Home"
            />
          </Link>
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
          <Link to="/signup">
            <Button />
          </Link>
        </li>
        <li className="nav-item">
          <button onClick={(e) => logout(e)} className="nav-item">
            Logout {name}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
