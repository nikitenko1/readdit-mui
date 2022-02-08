import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import alertReducer from './redux/reducers/alertReducer';
import userReducer from '././redux/reducers/userReducer';
import postReducer from '././redux/reducers/postReducer';
import subReducer from '././redux/reducers/subReducer';
import postCommentsReducer from '././redux/reducers/postCommentsReducer';
import userPageReducer from '././redux/reducers/userPageReducer';
import subPageReducer from '././redux/reducers/subPageReducer';
import searchReducer from '././redux/reducers/searchReducer';
import themeReducer from '././redux/reducers/themeReducer';

const reducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  posts: postReducer,
  postComments: postCommentsReducer,
  subs: subReducer,
  userPage: userPageReducer,
  subPage: subPageReducer,
  search: searchReducer,
  darkMode: themeReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
