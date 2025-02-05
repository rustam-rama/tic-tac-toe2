import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./TodoPage.css";

const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Задача не найдена");
        const data = await response.json();
        setTodo(data);
        setEditText(data.title);
      } catch (err) {
        setStatus((prev) => ({ ...prev, error: err.message }));
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editText }),
      });
      if (!response.ok) throw new Error("Ошибка при обновлении");
      const updatedTodo = await response.json();
      setTodo(updatedTodo);
      setIsEditing(false);
    } catch (err) {
      setStatus((prev) => ({ ...prev, error: err.message }));
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Ошибка при удалении");
      navigate("/");
    } catch (err) {
      setStatus((prev) => ({ ...prev, error: err.message }));
    }
  };

  if (status.loading) return <div className="loading">Загрузка...</div>;
  if (status.error) return <Navigate to="/404" replace />;
  if (!todo) return <Navigate to="/404" replace />;

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
