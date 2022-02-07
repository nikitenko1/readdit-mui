import axios from 'axios';
import { token } from './auth';
const setToken = () => {
  return {
    headers: { Authorization: token },
  };
};

const baseUrl = `/api/posts`;

const getPosts = async (sortBy, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/?sortby=${sortBy}&limit=${limit}&page=${page}`
  );
  return response.data;
};

const getSubPosts = async (limit, page) => {
  const response = await axios.get(
    `${baseUrl}/subscribed/?limit=${limit}&page=${page}`,
    setToken()
  );
  return response.data;
};

const getSearchResults = async (query, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/search/?query=${query}&limit=${limit}&page=${page}`
  );
  return response.data;
};

const addNew = async (postObj) => {
  const response = await axios.post(`${baseUrl}`, postObj, setToken());
  return response.data;
};

const editPost = async (id, postObj) => {
  const response = await axios.patch(`${baseUrl}/${id}`, postObj, setToken());
  return response.data;
};

const getPostComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

const upvotePost = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/upvote`,
    null,
    setToken()
  );
  return response.data;
};

const downvotePost = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/downvote`,
    null,
    setToken()
  );
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setToken());
  return response.data;
};

const upvoteComment = async (postId, commentId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/upvote`,
    null,
    setToken()
  );
  return response.data;
};

const downvoteComment = async (postId, commentId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/downvote`,
    null,
    setToken()
  );
  return response.data;
};

const upvoteReply = async (postId, commentId, replyId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}/upvote`,
    null,
    setToken()
  );
  return response.data;
};

const downvoteReply = async (postId, commentId, replyId) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}/downvote`,
    null,
    setToken()
  );
  return response.data;
};

const postComment = async (postId, commentObj) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment`,
    commentObj,
    setToken()
  );
  return response.data;
};

const postReply = async (postId, commentId, replyObj) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comment/${commentId}/reply`,
    replyObj,
    setToken()
  );
  return response.data;
};

const updateComment = async (postId, commentId, commentObj) => {
  const response = await axios.patch(
    `${baseUrl}/${postId}/comment/${commentId}`,
    commentObj,
    setToken()
  );
  return response.data;
};

const removeComment = async (postId, commentId) => {
  const response = await axios.delete(
    `${baseUrl}/${postId}/comment/${commentId}`,
    setToken()
  );
  return response.data;
};

const updateReply = async (postId, commentId, replyId, replyObj) => {
  const response = await axios.patch(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}`,
    replyObj,
    setToken()
  );
  return response.data;
};

const removeReply = async (postId, commentId, replyId) => {
  const response = await axios.delete(
    `${baseUrl}/${postId}/comment/${commentId}/reply/${replyId}`,
    setToken()
  );
  return response.data;
};

const postService = {
  getPosts,
  getSubPosts,
  getSearchResults,
  addNew,
  editPost,
  getPostComments,
  upvotePost,
  downvotePost,
  deletePost,
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply,
  postComment,
  postReply,
  updateComment,
  removeComment,
  updateReply,
  removeReply,
};

export default postService;
