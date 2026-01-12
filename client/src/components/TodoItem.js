import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}
          <div className="todo-meta">
            {todo.priority && (
              <span
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
              >
                {todo.priority}
              </span>
            )}
            {todo.dueDate && (
              <span className="due-date">
                Due: {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-sm btn-edit"
          title="Edit"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="btn btn-sm btn-delete"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
