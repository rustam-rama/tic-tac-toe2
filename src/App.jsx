import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import TodoList from "./components/TodoList-components/TodoList";
import TodoPage from "./components/TodoPages-components/TodoPage";
import NotFound from "./components/NotFound-components/NotFound";

function App() {
  const location = useLocation();
  // Упрощаем регулярное выражение
  const isValidUrl = /^\/(?:$|task\/[a-zA-Z0-9]+$|404$)/.test(
    location.pathname
  );

  if (!isValidUrl) return <Navigate to="/404" replace />;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/task/:id" element={<TodoPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
