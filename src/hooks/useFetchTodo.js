import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config";

export const useFetchTodo = () => {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Ошибка загрузки задач");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setStatus((prev) => ({ ...prev, error: err.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, setTodos };
};
