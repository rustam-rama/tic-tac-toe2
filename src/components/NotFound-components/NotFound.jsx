import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Упс! Кажется, вы забрели не туда...</p>
        <button onClick={() => navigate("/")} className="back-home">
          ← Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default NotFound;
