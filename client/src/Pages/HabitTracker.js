import { useState, useEffect } from "react";

function HabitTracker() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/test");
      response = await response.json();
      console.log(response);
      setData(response);
      console.log(setData(response));
    }
    fetchMyAPI();
  }, []);

  return (
    <div>
      <h1>Habit Tracker</h1>
      <p>{setData}</p>
    </div>
  );
}

export default HabitTracker;
