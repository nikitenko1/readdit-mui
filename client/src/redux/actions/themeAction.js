import { TOGGLE_DARK_MODE } from '../types/themeType';

const saveDarkMode = (boolean) => localStorage.setItem('darkMode', boolean);
const loadDarkMode = () => localStorage.getItem('darkMode');

export const toggleDarkMode = (isDarkMode) => {
  return (dispatch) => {
    saveDarkMode(isDarkMode);

    dispatch({ type: TOGGLE_DARK_MODE });
  };
};

export const setDarkMode = () => {
  return (dispatch) => {
    const isDarkMode = loadDarkMode();

    if (isDarkMode === 'true') {
      dispatch({ type: TOGGLE_DARK_MODE });
    }
  };
};
