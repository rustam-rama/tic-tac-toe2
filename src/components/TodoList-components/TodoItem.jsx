// Компонент для отдельной задачи
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TodoItem = ({ todo, onToggleComplete }) => {
  const navigate = useNavigate();

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, todo.completed)}
        className="todo-checkbox"
      />
      <span
        onClick={() => navigate(`/task/${todo.id}`)}
        className={`todo-title ${todo.completed ? "completed" : ""}`}
      >
        {todo.title}
      </span>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoItem;
