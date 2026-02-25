import axios from "../utils/axiosInstance";

export const fetchBanks = () => axios.get("/bank");
export const createBank = (data) => axios.post("/bank", data);
export const updateBank = (id, data) => axios.put(`/bank/${id}`, data);
export const deleteBank = (id) => axios.delete(`/bank/${id}`);
export const editUserProdile = (data) => axios.post("/user/edit", data);
export const editUserPassword = (data) => axios.post("/user/password", data);
export const getAllUser = (data) => axios.get("/user/gelAllUser", data);
export const updateUser = (userId, value) => axios.put(`/user/updateUser/${userId}`, { is_approved: value, });
export const deleteUser = (id) => axios.delete(`/user/delete/${id}`);
