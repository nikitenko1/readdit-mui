import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthDialog from '../auth';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useStyles } from './styles';
import DarkMode from '../darkMode';
import SubDialog from '../subs';
import UpdateAvatarDialog from '../updateAvatar';
import { getCircularAvatar } from '../../utils/cloudinaryTransform';

const MobileUserMenu = ({ auth, logout }) => {
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

  const loggedUser = JSON.parse(localStorage.getItem('logged')) || auth;

  return (
    <div>
      {loggedUser ? (
        <IconButton onClick={handleMenu} className={classes.userBtnMob}>
          {loggedUser?.avatar?.exists ? (
            <Avatar
              alt={loggedUser.username}
              src={getCircularAvatar(loggedUser.avatar.imageLink)}
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>{loggedUser.username[0]}</Avatar>
          )}
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton onClick={handleMenu} color="primary">
          <MoreVertIcon color="primary" />
        </IconButton>
      )}
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
        {loggedUser ? (
          <div>
            <MenuItem
              component={RouterLink}
              to={`/u/${loggedUser.username}`}
              onClick={handleClose}
            >
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
              </ListItemIcon>
            </MenuItem>
            <SubDialog type="mobile" handleCloseMenu={handleClose} />
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
          </div>
        ) : (
          <div>
            <AuthDialog closeMobileMenu={handleClose} />
            <Divider variant="middle" />
            <DarkMode closeMenu={handleClose} />
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
