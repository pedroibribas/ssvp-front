import { api } from './api';

interface CreateFlyerRequest {
  manager: string,
  text: string,
  items: {
    title: string
  }[]
}

interface AddDonationRequest {
  title: string
}

interface UpdateFlyerRequest {
  manager?: string
  text?: string
}

interface UpdateDonationPath {
  flyerId: string
  donationId: string
}

interface UpdateDonationRequest {
  title?: string
  donator?: string
}

api.interceptors.request.use(
  config => {
    const user = localStorage.getItem('ssvpUser') || null;
    const token = user ? JSON.parse(user).token : null;

    if (config.headers && token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  error => Promise.reject(error)
);

const getLists = async () => await api.get("/lists/auth");

const createList = async (data: CreateFlyerRequest) => await api.post("/lists/auth", data);

const getList = async (id: string) => await api.get(`/lists/auth/${id}`);

const addDonation = async (id: string, data: AddDonationRequest) => await api.post(`/lists/auth/${id}`, data);

const updateList = async (id: string, data: UpdateFlyerRequest) => await api.put(`/lists/auth/${id}`, data);

const deleteList = async (id: string) => await api.delete(`/lists/auth/${id}`);

const updateDonation = async (path: UpdateDonationPath, data: UpdateDonationRequest) => {
  await api.put(`/lists/auth/${path.flyerId}/${path.donationId}`, data);
}

const deleteDonation = async (flyerId: string, donationId: string) => {
  await api.delete(`/lists/auth/${flyerId}/${donationId}`);
}

export const ListApi = {
  getLists,
  createList,
  getList,
  addDonation,
  updateList,
  deleteList,
  updateDonation,
  deleteDonation
};