import { useState } from "react";
import { useTodo } from "../../context/TodoContext";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim());
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
        maxLength={20}
      />
      <button type="submit" className="add-button">
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;
