import axios from 'axios';
import { token } from './auth';
const setToken = () => {
  return {
    headers: { Authorization: token },
  };
};
const getAllSubreddits = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};
const baseUrl = `/api/subreddits`;
const getSubreddit = async (subredditName, sortBy, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/r/${subredditName}/?sortby=${sortBy}&limit=${limit}&page=${page}`
  );
  return response.data;
};

const createSubreddit = async (subredditObj) => {
  const response = await axios.post(`${baseUrl}`, subredditObj, setToken());
  return response.data;
};

const subscribeSub = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/subscribe`,
    null,
    setToken()
  );
  return response.data;
};

const updateDescription = async (id, descriptionObj) => {
  const response = await axios.patch(
    `${baseUrl}/${id}`,
    descriptionObj,
    setToken()
  );
  return response.data;
};

const getTopSubreddits = async () => {
  const response = await axios.get(`${baseUrl}/top10`);
  return response.data;
};

const subService = {
  getAllSubreddits,
  createSubreddit,
  getSubreddit,
  subscribeSub,
  updateDescription,
  getTopSubreddits,
};

export default subService;
