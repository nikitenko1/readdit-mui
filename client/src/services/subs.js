import { postAPI, getAPI, patchAPI } from './API';

const getAllSubreddits = async () => {
  const response = await getAPI('subreddits');
  return response.data;
};

const getSubreddit = async (subredditName, sortBy, limit, page) => {
  const response = await getAPI(
    `subreddits/r/${subredditName}/?sortby=${sortBy}&limit=${limit}&page=${page}`
  );
  return response.data;
};

const createSubreddit = async (subredditObj, token) => {
  const response = await postAPI('subreddits', subredditObj, token);
  return response.data;
};

const subscribeSub = async (id, token) => {
  const response = await postAPI(`subreddits/${id}/subscribe`, null, token);
  return response.data;
};

const updateDescription = async (id, descriptionObj, token) => {
  const response = await patchAPI(`subreddits/${id}`, descriptionObj, token);
  return response.data;
};

const getTopSubreddits = async () => {
  const response = await getAPI(`subreddits/top10`);
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
