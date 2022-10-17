import { api } from "./api";

type Data = {
  name: string;
  donations: {
    id: string;
    isChecked: boolean;
  }[]
}

export const getDonations = async () => {
  const response = await api.get("/donations");
  return response;
};

export const addDonator = async (data: Data) => {
  const response = await api.post("/donations/donator", data);
  return response;
};