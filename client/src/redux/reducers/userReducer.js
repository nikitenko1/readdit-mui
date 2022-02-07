import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_USER,
  SET_AVATAR,
  REMOVE_AVATAR,
} from '../types/userType';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case LOGOUT:
      return null;
    case SET_USER:
      return action.payload;
    case SET_AVATAR:
      return { ...state, ...action.payload };
    case REMOVE_AVATAR:
      return { ...state, avatar: { exists: false } };
    default:
      return state;
  }
};

export default userReducer;
