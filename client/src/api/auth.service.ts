import axiosClient from "./axiosClient";

export type Role = "student" | "teacher";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  id: string;
  className: string;
  role: Role;
}

export interface LoginRequest {
  id: string;
  role: Role;
}

export interface UserPayload {
  id: string;
  firstName: string;
  lastName: string;
  className: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: UserPayload;
}

export const authApi = {
  register: (body: RegisterRequest) =>
    axiosClient.post<AuthResponse>("/auth/register", body),

  login: (body: LoginRequest) =>
    axiosClient.post<AuthResponse>("/auth/login", body),

  me: () =>
    axiosClient.get<UserPayload>("/auth/me"),
};

export function persistAuth(data: AuthResponse) {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export function clearUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function getSavedUser(): UserPayload | null {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}