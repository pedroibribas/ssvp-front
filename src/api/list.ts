import axios from 'axios';

type List = {
  manager: string;
  items: {
    title: string;
  }[]
};

type Donator = {
  name: string;
  donations: {
    id: string;
    isChecked: boolean;
  }[]
}

// # API

const baseURL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : process.env.REACT_APP_LOCAL_URL;

const api = axios.create({
  baseURL: baseURL + "/api"
});

api.interceptors.request.use(
  config => {
    const user = localStorage.getItem('user') || null;
    const token = user ? JSON.parse(user).token : null;

    if (config.headers && token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  error => Promise.reject(error)
);

// # Services

export const getLists = async () => {
  const response = await api.get("/lists");
  return response;
};

export const getList = async (id: string) => {
  const response = await api.get(`/lists/${id}`);
  return response;
};

export const createList = async (data: List) => {
  const response = await api.post("/lists", data);
  return response;
};

export const addDonation = async (id: string, data: { title: string }) => {
  const response = await api.post(`/lists/${id}`, data);
  return response;
};

export const addDonator = async (id: string, data: Donator) => {
  const response = await api.post(`/lists/${id}/donations`, data);
  return response;
};

export const deleteList = async (id: string) => {
  const response = await api.delete(`/lists/${id}`);
  return response;
};

export const deleteDonation = async (listId: string, itemId: string) => {
  const response = await api.delete(
    `/lists/${listId}/donations/${itemId}`
  );
  return response;
};

export const deleteDonator = async (listId: string, itemId: string) => {
  const response = await api.delete(
    `/lists/${listId}/donations/${itemId}/donator`
  );
  return response;
};