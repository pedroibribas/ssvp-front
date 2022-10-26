import axios from 'axios';

interface User {
  username: string
  password: string
};

// # API

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api"
});

// # Services

export async function login(user: User) {
  const response = await api.post("/users/login", user);
  return response;
};