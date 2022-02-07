import { ALERT } from '../types/alertType';
import {
  CREATE_NEW_POST,
  FETCH_POST_COMMENTS,
  TOGGLE_VOTE,
  UPDATE_POST,
  VOTE_COMMENT,
  VOTE_REPLY,
  ADD_REPLY,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  EDIT_REPLY,
  DELETE_REPLY,
  SORT_COMMENTS,
} from '../types/postCommentsType';
import postService from '../../services/posts';

export const fetchPostComments = (id) => async (dispatch) => {
  const fetchedPost = await postService.getPostComments(id);
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: FETCH_POST_COMMENTS,
      payload: fetchedPost,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const createNewPost = (postObject) => async (dispatch) => {
  const addedPost = await postService.addNew(postObject);
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: CREATE_NEW_POST,
      payload: addedPost,
    });

    dispatch({ type: ALERT, payload: { loading: false } });
    return addedPost.id;
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const updatePost = (id, postObject) => async (dispatch) => {
  const updatedPost = await postService.editPost(id, postObject);
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: UPDATE_POST,
      payload: updatedPost,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const toggleUpvote =
  (id, upvotedBy, downvotedBy) => async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: TOGGLE_VOTE,
        payload: { upvotedBy, pointsCount, downvotedBy },
      });

      await postService.upvotePost(id);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const toggleDownvote =
  (id, downvotedBy, upvotedBy) => async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: TOGGLE_VOTE,
        payload: { upvotedBy, pointsCount, downvotedBy },
      });

      await postService.downvotePost(id);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const toggleCommentUpvote =
  (postId, commentId, upvotedBy, downvotedBy) => async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: VOTE_COMMENT,
        payload: { commentId, data: { upvotedBy, pointsCount, downvotedBy } },
      });

      await postService.upvoteComment(postId, commentId);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const toggleCommentDownvote =
  (postId, commentId, downvotedBy, upvotedBy) => async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: VOTE_COMMENT,
        payload: { commentId, data: { upvotedBy, pointsCount, downvotedBy } },
      });

      await postService.downvoteComment(postId, commentId);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const toggleReplyUpvote =
  (postId, commentId, replyId, upvotedBy, downvotedBy) => async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: VOTE_REPLY,
        payload: {
          commentId,
          replyId,
          data: { upvotedBy, pointsCount, downvotedBy },
        },
      });

      await postService.upvoteReply(postId, commentId, replyId);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const toggleReplyDownvote =
  (postId, commentId, replyId, downvotedBy, upvotedBy) => async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: VOTE_REPLY,
        payload: {
          commentId,
          replyId,
          data: { upvotedBy, pointsCount, downvotedBy },
        },
      });

      await postService.downvoteReply(postId, commentId, replyId);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const addReply = (postId, commentId, reply) => async (dispatch) => {
  const addedReply = await postService.postReply(postId, commentId, {
    reply,
  });
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: ADD_REPLY,
      payload: { commentId, addedReply },
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  const addedComment = await postService.postComment(postId, { comment });
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: ADD_COMMENT,
      payload: addedComment,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const editComment = (postId, commentId, comment) => async (dispatch) => {
  await postService.updateComment(postId, commentId, { comment });
  const updatedAt = Date.now();
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: EDIT_COMMENT,
      payload: { commentId, data: { updatedAt, commentBody: comment } },
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  await postService.removeComment(postId, commentId);
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const editReply =
  (postId, commentId, replyId, reply) => async (dispatch) => {
    await postService.updateReply(postId, commentId, replyId, { reply });
    const updatedAt = Date.now();
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: EDIT_REPLY,
        payload: { commentId, replyId, data: { updatedAt, replyBody: reply } },
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteReply = (postId, commentId, replyId) => async (dispatch) => {
  await postService.removeReply(postId, commentId, replyId);
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: DELETE_REPLY,
      payload: { commentId, replyId },
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const sortComments = (sortBy) => (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: SORT_COMMENTS,
      payload: sortBy,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};
