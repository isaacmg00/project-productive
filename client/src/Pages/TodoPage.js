import { useState, useEffect } from "react";
import TodoList from '../components/TodoList/TodoList';

function TodoPage() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/ToDoPage");
      response = await response.json();
      setBackendData(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div>
      <h1>To Do List</h1>
      <p>Here is your to-do list</p>
      <div className="todo-list">
        <TodoList />
      </div>
    
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
