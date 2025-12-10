import { useState } from "react";
import { createTask } from "../services/taskService";
import "../styles/TaskForm.css";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = await createTask({ title, description });
    onTaskAdded(newTask.data);

    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
        <div className="title_description">
            <div>
                <input
                    className="input"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <textarea
                    className="textarea"
                    placeholder="Enter description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
        <div>
            <button className="add-btn" type="submit">
                Add Task
            </button>
        </div>
    </form>
  );
};

export default TaskForm;
