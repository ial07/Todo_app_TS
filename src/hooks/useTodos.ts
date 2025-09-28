import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../services/todo.service";
import type { GetTodosParams, Todo, TodosResponse } from "../types/Todo.type";

export function useTodos(params?: GetTodosParams) {
  return useQuery<TodosResponse>({
    queryKey: ["todos", params], // cache per filter
    queryFn: () => getTodos(params),
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: Partial<Todo> }) =>
      updateTodo(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
