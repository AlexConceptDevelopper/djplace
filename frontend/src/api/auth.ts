import { post } from './client';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export async function registerUser(data: RegisterPayload): Promise<string> {
  return post<string>('/api/auth/register', data);
}

export async function loginUser(data: LoginPayload): Promise<string> {
  return post<string>('/api/auth/login', data);
}