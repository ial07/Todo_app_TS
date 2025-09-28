import { apiInstance } from "../api/index";
import type { ApiResponse } from "../types/Api.type";
import type { Todo, TodosResponse,GetTodosParams } from "../types/Todo.type";

function buildQuery(params?: GetTodosParams) {
  if (!params) return "";
  const query = new URLSearchParams();

  if (params.completed !== undefined) query.append("completed", String(params.completed));
  if (params.priority) query.append("priority", params.priority);
  if (params.dateGte) query.append("dateGte", params.dateGte);
  if (params.dateLte) query.append("dateLte", params.dateLte);
  if (params.page !== undefined) query.append("page", String(params.page));
  if (params.limit !== undefined) query.append("limit", String(params.limit));
  if (params.sort) query.append("sort", params.sort);
  if (params.order) query.append("order", params.order);

  return `?${query.toString()}`;
}

export async function getTodos(params?: GetTodosParams): Promise<TodosResponse> {
  const query = buildQuery(params);
  const { data } = await apiInstance.get<ApiResponse<TodosResponse>>(`/todos${query}`);
  return data.data;
}

export async function addTodo(todo: Omit<Todo, "id" | "userId" |"createdAt" | "updatedAt">): Promise<Todo> {
  
  const { data } = await apiInstance.post<ApiResponse<Todo>>("/todos", todo);
  return data.data;
}

export async function updateTodo(
  id: string,
  todo: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>
): Promise<Todo> {
  const { data } = await apiInstance.put<ApiResponse<Todo>>(`/todos/${id}`, todo);
  return data.data;
}

export async function deleteTodo(id: string): Promise<{ success: boolean }> {
  const { data } = await apiInstance.delete<ApiResponse<{ success: boolean }>>(
    `/todos/${id}`
  );
  return data.data;
}

