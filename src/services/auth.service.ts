import type { User } from "@/types/User.type";
import { apiInstance } from "../api";
import type { ApiResponse } from "../types/Api.type";
import type { AuthResponse } from "../types/Auth.type";

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiInstance.post<ApiResponse<AuthResponse>>("/auth/login", {
    email,
    password,
  });

  return data.data;
}

export async function registerUser(name:string,email: string, password: string): Promise<User> {
 const { data } = await apiInstance.post<ApiResponse<User>>("/auth/register", {
  name,  
  email,
    password,
  });

  return data.data
}

export async function logout(): Promise<void> {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
