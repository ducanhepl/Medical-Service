import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getUserInfor = (inputId) => {
  return axios.get(`/api/get-user-infor?id=${inputId}`);
};

const createUserService = (inputData) => {
  return axios.post("api/create-user", inputData);
};

const deleteUserService = (userId) => {
  return axios.delete("api/delete-user", {
    data: { id: userId },
  });
};

const editUserService = (inputData) => {
  return axios.put("api/edit-user", inputData);
};

export {
  handleLoginApi,
  getUserInfor,
  createUserService,
  deleteUserService,
  editUserService,
};
