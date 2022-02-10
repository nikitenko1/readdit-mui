import { postAPI, getAPI, patchAPI, deleteAPI } from './API';

const getPosts = async (sortBy, limit, page) => {
  const response = await getAPI(
    `posts/?sortby=${sortBy}&limit=${limit}&page=${page}`
  );
  return response.data;
};

const getSubPosts = async (limit, page, token) => {
  const response = await getAPI(
    `posts/subscribed/?limit=${limit}&page=${page}`,
    token
  );
  return response.data;
};

const getSearchResults = async (query, limit, page) => {
  const response = await getAPI(
    `posts/search/?query=${query}&limit=${limit}&page=${page}`
  );
  return response.data;
};

const addNew = async (postObj, token) => {
  const response = await postAPI(`posts`, postObj, token);
  return response.data;
};

const editPost = async (id, postObj, token) => {
  const response = await patchAPI(`posts/${id}`, postObj, token);
  return response.data;
};

const getPostComments = async (id) => {
  const response = await getAPI(`posts/${id}/comments`);
  return response.data;
};

const upvotePost = async (id, token) => {
  const response = await postAPI(`posts/${id}/upvote`, null, token);
  return response.data;
};

const downvotePost = async (id, token) => {
  const response = await postAPI(`posts/${id}/downvote`, null, token);
  return response.data;
};

const deletePost = async (id, token) => {
  const response = await deleteAPI(`posts/${id}`, token);
  return response.data;
};

const upvoteComment = async (postId, commentId, token) => {
  const response = await postAPI(
    `posts/${postId}/comment/${commentId}/upvote`,
    null,
    token
  );
  return response.data;
};

const downvoteComment = async (postId, commentId, token) => {
  const response = await postAPI(
    `posts/${postId}/comment/${commentId}/downvote`,
    null,
    token
  );
  return response.data;
};

const upvoteReply = async (postId, commentId, replyId, token) => {
  const response = await postAPI(
    `posts/${postId}/comment/${commentId}/reply/${replyId}/upvote`,
    null,
    token
  );
  return response.data;
};

const downvoteReply = async (postId, commentId, replyId, token) => {
  const response = await postAPI(
    `posts/${postId}/comment/${commentId}/reply/${replyId}/downvote`,
    null,
    token
  );
  return response.data;
};

const postComment = async (postId, commentObj, token) => {
  const response = await postAPI(`posts/${postId}/comment`, commentObj, token);
  return response.data;
};

const postReply = async (postId, commentId, replyObj, token) => {
  const response = await postAPI(
    `posts/${postId}/comment/${commentId}/reply`,
    replyObj,
    token
  );
  return response.data;
};

const updateComment = async (postId, commentId, commentObj, token) => {
  const response = await patchAPI(
    `posts/${postId}/comment/${commentId}`,
    commentObj,
    token
  );
  return response.data;
};

const removeComment = async (postId, commentId, token) => {
  const response = await deleteAPI(
    `posts/${postId}/comment/${commentId}`,
    token
  );
  return response.data;
};

const updateReply = async (postId, commentId, replyId, replyObj, token) => {
  const response = await patchAPI(
    `posts/${postId}/comment/${commentId}/reply/${replyId}`,
    replyObj,
    token
  );
  return response.data;
};

const removeReply = async (postId, commentId, replyId, token) => {
  const response = await deleteAPI(
    `posts/${postId}/comment/${commentId}/reply/${replyId}`,
    token
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
