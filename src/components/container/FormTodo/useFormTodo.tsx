import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  todoSchema,
  type TodoSchema,
} from "../../../lib/validation/todo.validation";
import {
  addTodo,
  deleteTodo,
  updateTodo,
} from "../../../services/todo.service";

const useFormTodo = () => {
  const queryClient = useQueryClient();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      completed: false,
    },
  });

  // Add Todo
  const addMutation = useMutation({
    mutationFn: (data: TodoSchema) => addTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
    },
  });

  // Update Todo
  const updateMutation = useMutation({
    mutationFn: (data: { id: string; payload: Partial<TodoSchema> }) =>
      updateTodo(data.id, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete Todo
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    addMutation,
    updateMutation,
    deleteMutation,
  };
};

export default useFormTodo;
