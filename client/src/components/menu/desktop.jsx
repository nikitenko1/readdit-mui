import React, { useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import AuthDialog from '../auth';
import { getCircularAvatar } from '../../utils/cloudinaryTransform';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Avatar,
  Typography,
} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import { useStyles } from './styles';
import DarkMode from '../darkMode';
import SubDialog from '../subs';
import UpdateAvatarDialog from '../updateAvatar';
// https://mui.com/components/app-bar/#main-content

const DesktopUserMenu = ({ auth, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedUser, setLoggedUser] = React.useState(null);

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
  useEffect(() => {
    const getLoggedUser = () => {
      setLoggedUser(JSON.parse(localStorage.getItem('logged')) || auth);
    };
    getLoggedUser();
  }, [auth]);

  return (
    <div>
      {loggedUser ? (
        <>
          <Button onClick={handleMenu} className={classes.userBtn}>
            {loggedUser?.avatar?.exists ? (
              <Avatar
                alt={loggedUser.username}
                src={getCircularAvatar(loggedUser.avatar.imageLink)}
                variant="rounded"
                className={classes.avatar}
              />
            ) : (
              <Avatar variant="rounded" className={classes.avatar}>
                {loggedUser.username[0]}
              </Avatar>
            )}
            <div>
              <Typography color="secondary">{loggedUser.username}</Typography>
              <Typography variant="caption" className={classes.karmaWrapper}>
                <FilterVintageIcon
                  fontSize="inherit"
                  style={{ marginRight: '0.2em' }}
                  color="secondary"
                />
                {loggedUser.karma} karma
              </Typography>
            </div>
          </Button>
          <Menu
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
            <MenuItem
              component={RouterLink}
              to={`/u/${loggedUser.username}`}
              onClick={handleClose}
            >
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
              </ListItemIcon>
            </MenuItem>
            <SubDialog type="menu" handleCloseMenu={handleClose} />
            <UpdateAvatarDialog
              handleCloseMenu={handleClose}
              user={loggedUser}
            />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
              </ListItemIcon>
            </MenuItem>
            <Divider variant="middle" />
            <DarkMode closeMenu={handleClose} />
          </Menu>
        </>
      ) : (
        <div className={classes.navItems}>
          <AuthDialog />
          <DarkMode closeMenu={handleClose} navItem={true} />
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;
