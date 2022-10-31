import axios from 'axios';

interface User {
  username: string
  password: string
};

// # API

const baseURL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : process.env.REACT_APP_LOCAL_URL;

const api = axios.create({
  baseURL: baseURL + "/api"
});

// # Services

export async function login(user: User) {
  const response = await api.post("/users/login", user);
  return response;
};