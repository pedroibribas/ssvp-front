import { api } from './api';

interface UserRequest {
  username: string
  password: string
}

const login = async (user: UserRequest) => await api.post("/users/login", user);

export const AuthApi = { login };