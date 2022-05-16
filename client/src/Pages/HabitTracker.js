import { useState, useEffect } from "react";
import "../App.css";
import TodoList from '../components/TodoList/TodoList';

function HabitTracker() {
  const [backendData, setBackendData] = useState([]);
  const [habit, setHabit] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/habit-tracker");
      response = await response.json();
      setBackendData(response);
    }
    fetchMyAPI();
  }, []);

  const handleCreateHabit = (e) => {
    e.preventDefault();
    const newHabit = "hello";

    fetch("http://localhost3000/api/v1/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHabit),
    }).then(() => {
      console.log("new habit added");
    });
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <p>Here are your habits</p>
      <div className="todo-list">
        <TodoList/>
      </div>
      <div>
        {typeof backendData.habits === "undefined" ? (
          <p>Loading...</p>
        ) : (
          backendData.habits.map((user_habit, i) => <p key={i}>{user_habit}</p>)
        )}
      </div>
      <button onClick={handleCreateHabit} type="submit">
        Create Habit
      </button>
      <button type="submit">Edit Habit</button>
      <button type="submit">Delete Habit</button>
      <button type="submit">Complete</button>
    </div>
  );
}

export default HabitTracker;