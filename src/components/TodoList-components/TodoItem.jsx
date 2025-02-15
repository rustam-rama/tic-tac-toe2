// Компонент для отдельной задачи
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTodo } from "../../context/TodoContext";

const TodoItem = ({ todo }) => {
  const navigate = useNavigate();
  const { updateTodo } = useTodo();

  const handleToggle = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="todo-checkbox"
      />
      <span
        className={`todo-title ${todo.completed ? "completed" : ""}`}
        onClick={() => navigate(`/task/${todo.id}`)}
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
};

export default TodoItem;
