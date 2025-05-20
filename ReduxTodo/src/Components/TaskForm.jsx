import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/Actions";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTask({
        id: Date.now(),
        title,
        description,
        status,
        date,
      })
    );

    setTitle("");
    setDescription("");
    setStatus("todo");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Description</label>
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="todo">To Do</option>
        <option value="progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
