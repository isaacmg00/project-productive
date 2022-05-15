import { useState, useEffect } from "react";

function HabitTracker() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/habit-tracker");
      response = await response.json();
      console.log(response);
      setBackendData(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div>
      <h1>Habit Tracker</h1>
      <p>Here are your habits</p>
      <div>
        {typeof backendData.habits === "undefined" ? (
          <p>Loading...</p>
        ) : (
          backendData.habits.map((user_habit, i) => <p key={i}>{user_habit}</p>)
        )}
      </div>
    </div>
  );
}

export default HabitTracker;
