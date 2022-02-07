import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions/userAction';
import { fetchPosts } from './redux/actions/postAction';
import { setSubList, setTopSubsList } from './redux/actions/subAction';
import { Alert } from './components/alert/Alert';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from './components/global/NotFound';

import Header from './components/global/Header';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts('hot'));
    dispatch(setSubList());
    dispatch(setTopSubsList());
    dispatch(setUser());
  }, [dispatch]);

  return (
    <div className="bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Alert />
      <Header />
      <main className="flex justify-center  gap-x-5 px-4 sm:px-12">
        <Switch>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
