import { useState, useEffect } from "react";

function TodoPage() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/ToDoPage");
      response = await response.json();
      console.log(response);
      setBackendData(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div>
      <h1>To Do List</h1>
      <p>Here is your to-do list</p>
      <div>
        {typeof backendData.todoItems === "undefined" ? (
          <p>Loading...</p>
        ) : (
          backendData.todoItems.map((item, i) => <p key={i}>{item}</p>)
        )}
      </div>
    </div>
  );
}

export default TodoPage;
