import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import TodoPage from "./Pages/TodoPage";
import Profile from "./Pages/Profile";
import Pomodoro from "./Pages/Pomodoro";
import Error from "./Pages/Error";
import NavBar from "./components/Navbar/Navbar";
import Signup from "./Pages/Signup";
import HabitTracker from "./Pages/HabitTracker";
import Footer from "./components/Footer/Footer";
import ZenQuotes from "./components/ZenQuotes";
import Login from "./Pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/getName");
      const parseRes = await response.json(); //will return whether the token is true or not
      console.log(parseRes);
    } catch (err) {}
  };

  //veryfying the token in the storage if there is a token in the storage
  const checkAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/is-verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json(); //will return whether the token is true or not

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false); //if their is a token in storage and it is verified, authenticate the user
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
          {/* temporary below */}
        <Route path="/ToDoPage" element={<TodoPage/>}/> 
        {/* <Route
          path="/ToDoPage"
          element={
            isAuthenticated ? (
              <TodoPage setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}

                <Route 
        path="/pomodoro" 
          element={
            isAuthenticated ? (
              <Pomodoro setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
          // element={<Pomodoro />}
        />
        {/* temporary below and uncomment the route */}
        <Route path="/Habit-tracker" element={<HabitTracker/>}/> 
        {/* <Route
          path="/Habit-tracker"
          element={
            isAuthenticated ? (
              <HabitTracker setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup setAuth={setAuth} />
            ) : (
              <Navigate to="/profile/:username" />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/profile/:username" />
            )
          }
        />
        <Route path="/profile/:username" element={<Profile username="" />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ZenQuotes />
      <Footer />
    </Router>
  );
};

export default App;
