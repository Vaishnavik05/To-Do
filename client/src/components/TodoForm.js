import React, { useState, useEffect } from 'react';
import '../styles/TodoForm.css';

const TodoForm = ({ onAddTodo, editingTodo, onUpdateTodo, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const payload = {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined
    };

    try {
      if (editingTodo && onUpdateTodo) {
        await onUpdateTodo(editingTodo._id, payload);
      } else {
        await onAddTodo(payload);
      }

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    } catch (err) {
      setError(editingTodo ? 'Failed to update todo. Please try again.' : 'Failed to add todo. Please try again.');
    }
  };

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority || 'medium');
      // ensure dueDate is formatted as YYYY-MM-DD for date input
      setDueDate(editingTodo.dueDate ? new Date(editingTodo.dueDate).toISOString().slice(0,10) : '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  }, [editingTodo]);

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          maxLength="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          maxLength="500"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </button>
        {editingTodo && (
          <button type="button" className="btn btn-secondary" onClick={() => onCancelEdit && onCancelEdit()}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
