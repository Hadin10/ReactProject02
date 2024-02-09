import React, { useState } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("low");

  const handleChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleAdd = () => {
    if (taskInput.trim() === "") {
      alert("Plz enter your task");
      return;
    }
    const newTask = {
      id: Date.now(),
      task: taskInput,
      priority: priority,
      completed: true,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const handleEdit = (taskId, newTaskText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, task: newTaskText } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggle = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const sortedTasks = tasks.sort((a, b) => {
    if (a.priority === "high" && b.priority !== "high") return -1;
    if (b.priority === "high" && a.priority !== "high") return 1;
    if (a.priority === "medium" && b.priority === "low") return -1;
    if (b.priority === "medium" && a.priority === "low") return 1;
    return 0;
  });

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>
      <div className="row mb-4">
        <input
          className="col form-control"
          type="text"
          value={taskInput}
          onChange={handleChange}
          placeholder="Enter your task"
        />
        <select className="col form-control" value={priority} onChange={handlePriority}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="col btn btn-primary" onClick={handleAdd}>Add Task</button>
      </div>
      <div>
        <h1>Total Tasks: {totalTasks}</h1>
        <h1>Completed Tasks: {completedTasks}</h1>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <h3 style={{ color: task.priority }}>
              {task.task}
            </h3>
            <div>
              <button className="col btn btn-primary m-1" onClick={() => handleToggle(task.id)}>
                {task.completed ? "incomplete" : "Complete"}
              </button>
              <button className="col btn btn-primary m-1" onClick={() => handleEdit(task.id, prompt("Edit your task:"))}>
                Edit
              </button>
              <button className="col btn btn-primary m-1" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
