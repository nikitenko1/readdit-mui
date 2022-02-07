import axios from 'axios';
import { token } from './auth';
const setToken = () => {
  return {
    headers: { Authorization: token },
  };
};
const baseUrl = `/api/users`;
const getUser = async (username, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/${username}/?limit=${limit}&page=${page}`
  );
  return response.data;
};

const uploadAvatar = async (avatarObj) => {
  const response = await axios.post(`${baseUrl}/avatar`, avatarObj, setToken());
  return response.data;
};

const removeAvatar = async () => {
  const response = await axios.delete(`${baseUrl}/avatar`, setToken());
  return response.data;
};

const userService = { getUser, uploadAvatar, removeAvatar };

export default userService;
