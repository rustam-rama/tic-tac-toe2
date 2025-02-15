import { Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./components/TodoList-components/TodoList";
import TodoPage from "./components/TodoPages-components/TodoPage";
import NotFound from "./components/NotFound-components/NotFound";
import { TodoProvider } from "./context/TodoContext";

function TodoApp() {
  return (
    <TodoProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/task/:id" element={<TodoPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </TodoProvider>
  );
}

export default TodoApp;
