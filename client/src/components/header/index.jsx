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
import MobileUserMenu from '../mobileUserMenu';
import DesktopUserMenu from '../desktopUserMenu';

const Header = () => {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);
  const theme = useTheme();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar disableGutters={mobile}>
        {!searchOpen && (
          <>
            <div className={classes.header_left}>
              <div className={classes.header_left_wrapper}>
                <Button
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
                  onClick={() => setSearchOpen((prevState) => !prevState)}
                >
                  <SearchIcon />
                </IconButton>
                <MobileUserMenu auth={auth} handleLogout={handleLogout} />
              </>
            ) : (
              <DesktopUserMenu auth={auth} handleLogout={handleLogout} />
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
