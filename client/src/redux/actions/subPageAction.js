import { ALERT } from '../types/alertType';
import {
  FETCH_SUB,
  LOAD_SUB_POSTS,
  TOGGLE_SUBPAGE_VOTE,
  SUBSCRIBE_SUB,
  EDIT_DESCRIPTION,
} from '../types/subPageType';
import subService from '../../services/subs';
import postService from '../../services/posts';

export const fetchSub = (subredditName, sortBy) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const sub = await subService.getSubreddit(subredditName, sortBy, 10, 1);

    dispatch({ type: ALERT, payload: { loading: true } });

    dispatch({
      type: FETCH_SUB,
      payload: sub,
    });

    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const loadSubPosts =
  (subredditName, sortBy, page) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const sub = await subService.getSubreddit(
        subredditName,
        sortBy,
        10,
        page
      );

      dispatch({
        type: LOAD_SUB_POSTS,
        payload: sub,
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
        type: TOGGLE_SUBPAGE_VOTE,
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
        type: TOGGLE_SUBPAGE_VOTE,
        payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
      });

      await postService.downvotePost(id);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const toggleSubscribe =
  (id, subscribedBy, token) => async (dispatch) => {
    const subscriberCount = subscribedBy.length;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      dispatch({
        type: SUBSCRIBE_SUB,
        payload: { subscribedBy, subscriberCount },
      });

      await subService.subscribeSub(id, token);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const editDescription = (id, description, token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    await subService.updateDescription(id, { description }, token);

    dispatch({
      type: EDIT_DESCRIPTION,
      payload: description,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};
