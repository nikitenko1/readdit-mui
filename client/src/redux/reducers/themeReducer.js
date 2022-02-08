import { TOGGLE_DARK_MODE } from '../types/themeType';

const themeReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return !state;
    default:
      return state;
  }
};

export default themeReducer;
