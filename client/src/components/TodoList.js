import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return <div className="empty-state">No todos yet. Create one to get started!</div>;
  }

  const completed = todos.filter((t) => t.completed);
  const pending = todos.filter((t) => !t.completed);

  return (
    <div className="todo-list">
      {pending.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">
            Pending ({pending.length})
          </h2>
          <div className="todo-items">
            {pending.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">
            Completed ({completed.length})
          </h2>
          <div className="todo-items">
            {completed.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
