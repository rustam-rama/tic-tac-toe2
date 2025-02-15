import { createContext, useState, useContext } from "react";
import {
  useFetchTodo,
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../hooks";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { todos, setTodos } = useFetchTodo();
  const { addTodo } = useAddTodo(setTodos);
  const { updateTodo } = useUpdateTodo(setTodos);
  const { deleteTodo } = useDeleteTodo(setTodos);

  const value = {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Создаём кастомный хук для удобства
export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo должен использоваться внутри TodoProvider");
  }

  return context;
};
