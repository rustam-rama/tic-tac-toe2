import { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Какая задача на сегодня?"
        className="todo-input"
      />
      <button type="submit" className="add-button">
        Добавить
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default TodoForm;
