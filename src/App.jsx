import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTaskModal from "./components/EditTaskModal";

import Login from "./components/Login";
import Signup from "./components/Signup";
import authService from "./services/authService";
import { getTasks, deleteTask, updateTask } from "./services/taskService";

import "./App.css";
import "./styles/auth.css";

function Dashboard() {
  const navigate = useNavigate(); 
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (task) => {
    try {
      const updated = await updateTask(task._id, {
        completed: !task.completed,
        title: task.title,
        description: task.description,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? updated.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveEditedTask = async (updatedTask) => {
    try {
      const res = await updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? res.data : t)));
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="dashboard-header">
        <h1>To-Do List</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <TaskForm onTaskAdded={(newTask) => setTasks([newTask, ...tasks])} />

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onComplete={handleComplete}
        onEdit={handleEdit}
      />

      <EditTaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEditedTask}
      />
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
