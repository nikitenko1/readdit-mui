import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userAction';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useStyles } from './styles';
import RedditIcon from '@mui/icons-material/Reddit';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import SearchBar from '../searchBar';
import MenuMobile from '../menu/mobile';
import MenuDesktop from '../menu/desktop';

const Header = () => {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);
  const theme = useTheme();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    return await dispatch(logoutUser(auth));
  };
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar disableGutters={mobile}>
        {!searchOpen && (
          <>
            <div className={classes.left}>
              <div className={classes.left_wrapper}>
                <Button
                  className={classes.logo}
                  color="primary"
                  startIcon={<RedditIcon />}
                  size="large"
                  component={RouterLink}
                  to="/"
                >
                  Readdit
                </Button>
              </div>
              {!mobile && <SearchBar />}
            </div>
            {mobile ? (
              <>
                <IconButton
                  color="primary"
                  className={classes.searchBtn}
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <SearchIcon />
                </IconButton>
                <MenuMobile auth={auth} logout={handleLogout} />
              </>
            ) : (
              <MenuDesktop auth={auth} logout={handleLogout} />
            )}
          </>
        )}
        {searchOpen && mobile && (
          <SearchBar mobile={mobile} setSearchOpen={setSearchOpen} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
