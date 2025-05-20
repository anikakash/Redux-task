import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { updateTask, removeTask } from "../redux/Actions"; 

const TaskList = () => {
  const allTasks = useSelector((state) => state);

  const [filterList, setfilterList] = useState("All"); 

  const tasks =
    filterList === "All"
      ? allTasks
      : allTasks.filter((todo) => todo.status === filterList);

  const dispatch = useDispatch();

  // Track editing state for each task (true/false)
  const [editTaskId, setEditTaskId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
    status: "",
  });

  // Triggered when edit button is clicked
  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      date: task.date,
      status: task.status,
    });
  };

  // Handle field change for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited task
  const handleSave = () => {
    dispatch(updateTask(editTaskId, editData)); 
    setEditTaskId(null); 
  };

  // Cancel editing
  const handleCancel = () => {
    setEditTaskId(null);
    setEditData({
      title: "",
      description: "",
      date: "",
      status: "",
    });
  };

  // Delete a task
  const handleDelete = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <>
      <div>
        <label htmlFor="filter">Filter by Priority: </label>
        <select
          id="filter"
          value={filterList}
          onChange={(e) => setfilterList(e.target.value)}
        >
          <option value="All">All</option>
          <option value="todo">Todo</option>
          <option value="progress">Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div style={{ width: "100%", padding: "1rem" }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: "1rem",
              borderBottom: "1px solid #ccc",
            }}
          >
            {editTaskId === task.id ? (
              // Edit mode
              <>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  placeholder="Task Title"
                />
                <input
                  type="text"
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <input
                  type="date"
                  name="date"
                  value={editData.date}
                  onChange={handleChange}
                />
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleChange}
                >
                  <option value="todo">Todo</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              // Display task info when not in edit mode
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.date}</p>
                <p>Status: {task.status}</p>
                <div>
                  <FaEdit onClick={() => handleEditClick(task)} />
                  <FaTrash onClick={() => handleDelete(task.id)} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
