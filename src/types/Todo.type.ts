export type Priority = "LOW" | "MEDIUM" | "HIGH"

export type Todo = {
    id:string;
    title:string;
    completed: boolean;
    date: string;
    priority: Priority;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface TodosResponse {
  todos: Todo[];
  totalTodos: number;
  hasNextPage: boolean;
  nextPage: number;
}

export type GetTodosParams = {
  completed?: boolean;
  priority?: Priority;
  dateGte?: string; // ISO string or YYYY-MM-DD
  dateLte?: string;
  page?: number;
  limit?: number;
  sort?: keyof Todo;
  order?: "asc" | "desc";
};