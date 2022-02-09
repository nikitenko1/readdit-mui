import React from 'react';
import { useStyles } from './styles';
import { Link as RouterLink } from 'react-router-dom';

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// https://mui.com/components/app-bar/#main-content

const DesktopUserMenu = ({ auth, handleLogout }) => {
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
    handleLogout();
  };

  return (
    <div>
      {!auth ? (
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
              <MenuItem component={RouterLink} to="/u" onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PowerSettingsNewIcon style={{ marginRight: 7 }} />{' '}
                  SubFormModal
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PowerSettingsNewIcon style={{ marginRight: 7 }} />{' '}
                  UpdateAvatarModal
                </ListItemIcon>
              </MenuItem>

              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
                </ListItemIcon>
              </MenuItem>
              <Divider variant="middle" />
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <PowerSettingsNewIcon style={{ marginRight: 7 }} />{' '}
                  DarkModeMenuItem
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </div>
        </>
      ) : (
        <div className={classes.navItems}>
          <div>AuthFormModal</div>
          <div>DarkModeMenuItem</div>
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;
