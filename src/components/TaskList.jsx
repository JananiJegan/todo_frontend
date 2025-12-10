import "../styles/TaskList.css";

const TaskList = ({ tasks, onDelete, onComplete, onEdit }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
          <div className="task-content">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>

          <div className="task-actions">
            <button className="btn complete" onClick={() => onComplete(task)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button className="btn edit" onClick={() => onEdit(task)}>
              Edit
            </button>

            <button className="btn delete" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
