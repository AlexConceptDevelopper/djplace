import { apiFetch } from "./client";
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse 
} from "../type/auth";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response) {
    throw new Error("Réponse de connexion invalide.");
  }

  return response;
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await apiFetch<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response) {
    throw new Error("Réponse d'inscription invalide.");
  }

  return response;
}