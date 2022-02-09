import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import AuthDialog from '../auth';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStyles } from './styles';
// https://mui.com/components/app-bar/#main-content

const DesktopUserMenu = ({ auth, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    logout();
  };

  const loggedUser = JSON.parse(localStorage.getItem('readifyUserKey')) || auth;

  return (
    <div>
      {auth ? (
        <>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {loggedUser ? (
                <div>
                  <MenuItem
                    component={RouterLink}
                    to={`/u/${loggedUser.username}`}
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon style={{ marginRight: 7 }} /> My
                      Profile
                    </ListItemIcon>
                  </MenuItem>
                  <h5>SubFormModal</h5>
                  <h5>UpdateAvatarModal</h5>

                  <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon>
                      <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
                    </ListItemIcon>
                  </MenuItem>
                  <Divider variant="middle" />
                  <h5>DarkModeMenuItem</h5>
                </div>
              ) : (
                <div>
                  <AuthDialog closeMobileMenu={handleClose} />
                  <Divider variant="middle" />
                  <div>DarkModeMenuItem</div>
                </div>
              )}
            </Menu>
          </div>
        </>
      ) : (
        <div className={classes.navItems}>
          <AuthDialog />
          <div>DarkModeMenuItem</div>
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;
