import { api } from './api';

interface User {
  username: string
  password: string
};

export async function login(user: User) {
  const response = await api.post("/users/login", user);
  return response;
};