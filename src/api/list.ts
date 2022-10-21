import { api } from "./api";

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