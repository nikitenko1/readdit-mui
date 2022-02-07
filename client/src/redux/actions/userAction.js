import { ALERT } from '../types/alertType';
import authService from '../../services/auth';
import userService from '../../services/user';
import storageService from '../../utils/localStorage';
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
    storageService.saveUser(user);
    authService.setToken(user.token);

    dispatch({
      type: LOGIN,
      payload: user,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const signupUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const user = await authService.signup(credentials);
    storageService.saveUser(user);
    authService.setToken(user.token);

    dispatch({
      type: SIGNUP,
      payload: user,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const logoutUser = () => (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    storageService.logoutUser();
    authService.setToken(null);

    dispatch({
      type: LOGOUT,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const setUser = () => (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      authService.setToken(loggedUser.token);

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

export const setAvatar = (avatarImage) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const uploadedAvatar = await userService.uploadAvatar({ avatarImage });
    const prevUserData = storageService.loadUser();
    storageService.saveUser({ ...prevUserData, ...uploadedAvatar });

    dispatch({
      type: SET_AVATAR,
      payload: uploadedAvatar,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const deleteAvatar = () => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    await userService.removeAvatar();
    const prevUserData = storageService.loadUser();
    storageService.saveUser({ ...prevUserData, avatar: { exists: false } });

    dispatch({
      type: REMOVE_AVATAR,
    });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};
