import { ALERT } from '../types/alertType';
import {
  SET_SEARCH_RESULTS,
  LOAD_SEARCH_POSTS,
  TOGGLE_SEARCH_VOTE,
} from '../types/searchType';
import postService from '../../services/posts';

export const setSearchResults = (query) => async (dispatch) => {
  const results = await postService.getSearchResults(query, 10, 1);
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: results,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const loadSearchPosts = (query, page) => async (dispatch) => {
  const results = await postService.getSearchResults(query, 10, page);
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: LOAD_SEARCH_POSTS,
      payload: results,
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
        type: TOGGLE_SEARCH_VOTE,
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
        type: TOGGLE_SEARCH_VOTE,
        payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
      });

      await postService.downvotePost(id);
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
