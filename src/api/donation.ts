import { api } from "./api";

type DonatorArg = {
  donator: {
    name: string,
    phone: string
  }
};

export const getDonations = async () => {
  const response = await api.get("/donations");
  return response;
};

export const setDonation = async (data: string) => {
  const response = await api.post("/donations", data);
  return response;
};

export const addDonator = async (param: string, donator: DonatorArg) => {
  const response = await api.post(`/donations/${param}`, donator);
  return response;
};