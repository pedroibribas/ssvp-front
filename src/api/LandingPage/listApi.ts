import { api } from './api';

interface UpdateDonationPath {
  flyerId: string
  donationId: string
}

interface UpdateDonationRequest {
  title?: string
  donator?: string
}

const getList = async (id: string) => await api.get(`/lists/${id}`);

const updateDonation = async (path: UpdateDonationPath, data: UpdateDonationRequest) => {
  await api.put(`/lists/${path.flyerId}/${path.donationId}`, data);
}

export const ListApi = { getList, updateDonation };