import { ALERT } from '../types/alertType';
import authService from '../../services/auth';
import userService from '../../services/user';
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_USER,
  SET_AVATAR,
  REMOVE_AVATAR,
} from '../types/userType';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const user = await authService.login(credentials);

    localStorage.setItem('logged', JSON.stringify(user));
    dispatch({
      type: LOGIN,
      payload: user,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
    dispatch({
      type: ALERT,
      payload: {
        success: `Welcome, ${credentials.username}. You're logged in!`,
      },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const signupUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const user = await authService.signup(credentials);
    localStorage.setItem('logged', JSON.stringify(user));

    dispatch({
      type: SIGNUP,
      payload: user,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
    dispatch({
      type: ALERT,
      payload: {
        success: `Welcome, ${credentials.username}. You've been successfully registered.`,
      },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const logoutUser = (credentials) => (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    localStorage.removeItem('logged');

    dispatch({
      type: LOGOUT,
      payload: null,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
    dispatch({
      type: ALERT,
      payload: {
        warning: `Oops, u/${credentials.username} logged out`,
      },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: `Something went wrong!` } });
  }
};

export const setUser = () => (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const loggedUser = JSON.parse(localStorage.getItem('logged'));

    if (loggedUser) {
      dispatch({
        type: SET_USER,
        payload: loggedUser,
      });
    }
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const postAvatar = (avatarImage, token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const uploadedAvatar = await userService.uploadAvatar(
      {
        avatarImage,
      },
      token
    );
    const prevUserData = JSON.parse(localStorage.getItem('logged'));

    localStorage.setItem(
      'logged',
      JSON.stringify({ ...prevUserData, ...uploadedAvatar })
    );

    dispatch({
      type: SET_AVATAR,
      payload: uploadedAvatar,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
    dispatch({
      type: ALERT,
      payload: {
        success: `Successfully updated the avatar!`,
      },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const deleteAvatar = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    await userService.removeAvatar(token);
    const prevUserData = JSON.parse(localStorage.getItem('logged'));
    localStorage.setItem(
      'logged',
      JSON.stringify({ ...prevUserData, avatar: { exists: false } })
    );

    dispatch({
      type: REMOVE_AVATAR,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
    dispatch({
      type: ALERT,
      payload: {
        warning: `Successfully removed the avatar!`,
      },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};
