import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import todoService from '../services/todoService';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await todoService.getAllTodos();
      setTodos(data || []);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      setError('');
      const createdTodo = await todoService.createTodo(newTodo);
      setTodos([createdTodo, ...todos]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      setError('');
      const updatedTodo = await todoService.toggleTodo(id);
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setError('');
        await todoService.deleteTodo(id);
        setTodos(todos.filter((t) => t._id !== id));
      } catch (err) {
        setError('Failed to delete todo. Please try again.');
        console.error(err);
      }
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (id, updatedFields) => {
    try {
      setError('');
      const updatedTodo = await todoService.updateTodo(id, updatedFields);
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
      setEditingTodo(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 My TODO App</h1>
        <p>Stay organized and productive</p>
      </header>

      <main className="app-main">
        <div className="container">
          {error && <div className="error-banner">{error}</div>}

          <div className="app-grid">
            <div className="form-section">
              <TodoForm
                onAddTodo={handleAddTodo}
                editingTodo={editingTodo}
                onUpdateTodo={handleUpdateTodo}
                onCancelEdit={() => setEditingTodo(null)}
              />
            </div>

            <div className="list-section">
              {loading ? (
                <div className="loading">Loading todos...</div>
              ) : (
                <TodoList
                  todos={todos}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 TODO App. Built with React, Express & MongoDB.</p>
      </footer>
    </div>
  );
}

export default App;
