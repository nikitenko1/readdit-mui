import {
  SET_POSTS,
  LOAD_MORE_POSTS,
  TOGGLE_VOTE,
  DELETE_POST,
} from '../types/postType';
import { ALERT } from '../types/alertType';
import postService from '../../services/posts';

export const fetchPosts = (sortBy) => async (dispatch) => {
  let posts;

  if (sortBy !== 'subscribed') {
    posts = await postService.getPosts(sortBy, 10, 1);
  } else {
    posts = await postService.getSubPosts(10, 1);
  }
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: SET_POSTS,
      payload: posts,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const loadMorePosts = (sortBy, page) => async (dispatch) => {
  let posts;
  if (sortBy !== 'subscribed') {
    posts = await postService.getPosts(sortBy, 10, page);
  } else {
    posts = await postService.getSubPosts(10, page);
  }
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    dispatch({
      type: LOAD_MORE_POSTS,
      payload: posts,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const toggleUpvote =
  (id, upvotedBy, downvotedBy, token  ) => async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }
    dispatch({ type: ALERT, payload: { loading: true } });

    dispatch({
      type: TOGGLE_VOTE,
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.upvotePost(id, token);
    dispatch({ type: ALERT, payload: { loading: false } });
  };

export const toggleDownvote =
  (id, downvotedBy, upvotedBy, token) => async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      dispatch({
        type: TOGGLE_VOTE,
        payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
      });

      await postService.downvotePost(id, token);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const removePost = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    await postService.deletePost(id, token);

    dispatch({
      type: ALERT,
      payload: { success: `Post deleted!` },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};
