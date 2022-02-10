import { postAPI } from './API';

const login = async (credentials) => {
  const response = await postAPI('login', credentials);
  return response.data;
};

const signup = async (enteredData) => {
  const response = await postAPI('signup', enteredData);
  return response.data;
};

const authService = { login, signup };

export default authService;
