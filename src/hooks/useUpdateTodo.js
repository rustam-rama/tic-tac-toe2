import { API_URL } from "../config";

export const useUpdateTodo = (setTodos) => {
  const updateTodo = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Ошибка при обновлении задачи");

    const updatedTodo = await response.json();
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
    return updatedTodo;
  };

  return { updateTodo };
};
