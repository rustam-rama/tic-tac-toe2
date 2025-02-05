import { API_URL } from "../config";

export const useDeleteTodo = (setTodos) => {
  const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Ошибка при удалении задачи");

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { deleteTodo };
};
