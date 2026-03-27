import API from "./api";

export const deleteAccount = () => API.delete("/auth/delete-account");

export const loginUser = (data) => API.post("/auth/login", data);