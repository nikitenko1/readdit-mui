import { postAPI, getAPI, deleteAPI } from './API';

const getUser = async (username, limit, page) => {
  const response = await getAPI(
    `users/${username}/?limit=${limit}&page=${page}`
  );
  return response.data;
};

const uploadAvatar = async (avatarObj, token) => {
  const response = await postAPI(`users/avatar`, avatarObj, token);
  return response.data;
};

const removeAvatar = async (token) => {
  const response = await deleteAPI(`users/avatar`, token);
  return response.data;
};

const userService = { getUser, uploadAvatar, removeAvatar };

export default userService;
