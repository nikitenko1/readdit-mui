import { ALERT } from '../types/alertType';
import userService from '../../services/user';
import postService from '../../services/posts';
import {
  FETCH_USER,
  LOAD_USER_POSTS,
  TOGGLE_USERPAGE_VOTE,
} from '../types/userPageType';

export const fetchUser = (username) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const user = await userService.getUser(username, 5, 1);

    dispatch({
      type: FETCH_USER,
      payload: user,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const loadUserPosts = (username, page) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const user = await userService.getUser(username, 5, page);

    dispatch({
      type: LOAD_USER_POSTS,
      payload: user,
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
        type: TOGGLE_USERPAGE_VOTE,
        payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
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
        type: TOGGLE_USERPAGE_VOTE,
        payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
      });

      await postService.downvotePost(id);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
