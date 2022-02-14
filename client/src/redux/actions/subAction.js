import { ALERT } from '../types/alertType';
import {
  SET_ALL_SUBS_LIST,
  SET_TOP_SUBS_LIST,
  SUBSCRIBE_SUB_FROM_LIST,
  ADD_NEW_SUB,
} from '../types/subType';
import subService from '../../services/subs';

export const setSubList = () => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const subs = await subService.getAllSubreddits();
    dispatch({
      type: SET_ALL_SUBS_LIST,
      payload: subs,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const setTopSubsList = () => async (dispatch) => {
  const top10Subs = await subService.getTopSubreddits();
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: SET_TOP_SUBS_LIST,
      payload: top10Subs,
    });
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
        type: SUBSCRIBE_SUB_FROM_LIST,
        payload: { id, data: { subscribedBy, subscriberCount } },
      });

      await subService.subscribeSub(id, token);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const addNewSub = (values, token) => async (dispatch) => {
  try {
    const res = await subService.createSubreddit(values, token);
    dispatch({ type: ALERT, payload: { loading: true } });
    dispatch({
      type: ADD_NEW_SUB,
      payload: {
        subredditName: res.subredditName,
        id: res.id,
      },
    });
    dispatch({ type: ALERT, payload: { loading: false } });
    dispatch({
      type: ALERT,
      payload: { success: `New subreddish created: r/${values.subredditName}` },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};
