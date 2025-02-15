import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useTodo } from "../../context/TodoContext";
import "./TodoPage.css";

const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  // Получаем данные и функции из контекста
  const { todos, updateTodo, deleteTodo } = useTodo();

  // Находим задачу в контексте
  const todo = todos.find((item) => item.id === id);

  // Если задача не найдена
  if (!todo) return <Navigate to="/" replace />;

  // При первом рендере устанавливаем текст
  if (!editText && todo.title) {
    setEditText(todo.title);
  }

  const handleUpdate = async () => {
    try {
      await updateTodo(id, { title: editText });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todo-page">
      {isEditing ? (
        <div className="edit-form">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate} className="save-button">
              Сохранить
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <h2>{todo.title}</h2>
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Редактировать
            </button>
            <button onClick={handleDelete} className="delete-button">
              Удалить
            </button>
          </div>
        </>
      )}
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
    </div>
  );
};

export default TodoPage;
