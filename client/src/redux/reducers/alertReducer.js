import { ALERT } from '../types/alertType';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case ALERT:
      return action.payload;

    default:
      return state;
  }
};

export default authReducer;
