import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Switch, Route } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/userAction';
import { fetchPosts } from './redux/actions/postAction';
import { setSubList, setTopSubsList } from './redux/actions/subAction';
import { Alert } from './components/alert/Alert';
import { customTheme } from './styles/theme';
import Header from './components/global/Header';
import PageRender from './PageRender';
import { useStyles } from './styles/index';
const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchPosts('hot'));
    dispatch(setSubList());
    dispatch(setTopSubsList());
    dispatch(setUser());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={customTheme(darkMode)}>
        <Paper className={classes.root} elevation={0}>
          <Alert />
          <Header />
          <Switch>
            <Route exact path="/" component={PageRender} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:slug" component={PageRender} />
          </Switch>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default App;
