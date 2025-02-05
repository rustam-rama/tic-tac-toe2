import { API_URL } from "../config";

export const useAddTodo = (setTodos) => {
  const addTodo = async (title) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });

    if (!response.ok) throw new Error("Ошибка при добавлении задачи");

    const newTodo = await response.json();
    setTodos((prev) => [...prev, newTodo]);
    return newTodo;
  };

  return { addTodo };
};
