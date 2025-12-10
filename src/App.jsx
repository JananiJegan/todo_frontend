import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTaskModal from "./components/EditTaskModal"; // import modal
import { getTasks, deleteTask, updateTask } from "./services/taskService";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // task being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // modal open state

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Delete task
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  // Toggle complete
  const handleComplete = async (task) => {
    const updated = await updateTask(task._id, {
      completed: !task.completed,
      title: task.title,
      description: task.description,
    });

    setTasks(tasks.map((t) => (t._id === task._id ? updated.data : t)));
  };

  // Open modal to edit
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Save edited task from modal
  const handleSaveEditedTask = async (updatedTask) => {
    const res = await updateTask(updatedTask._id, updatedTask);
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? res.data : t)));
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>

      <TaskForm
        onTaskAdded={(newTask) => setTasks([newTask, ...tasks])}
      />

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onComplete={handleComplete}
        onEdit={handleEdit}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEditedTask}
      />
    </div>
  );
}

export default App;
