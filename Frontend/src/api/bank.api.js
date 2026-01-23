import axios from "../utils/axiosInstance";

export const fetchBanks = () => axios.get("/bank");
export const createBank = (data) => axios.post("/bank", data);
export const updateBank = (id, data) => axios.put(`/bank/${id}`, data);
export const deleteBank = (id) => axios.delete(`/bank/${id}`);
