import React from 'react';
import { useStyles } from './styles';
import { Link as RouterLink } from 'react-router-dom';

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

// https://mui.com/components/app-bar/#main-content

const MobileUserMenu = ({ auth, handleLogout }) => {
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
      {auth ? (
        <IconButton onClick={handleMenu} className={classes.userBtnMob}>
          {auth?.avatar?.exists ? (
            <Avatar
              alt={auth.username}
              src="/noAvatar.png"
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>{auth.username[0]}</Avatar>
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
        {auth ? (
          <div>
            <MenuItem component={RouterLink} to={`/u`} onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> SubFormModal
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
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} />{' '}
                AuthFormModal
              </ListItemIcon>
            </MenuItem>

            <Divider variant="middle" />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} />{' '}
                DarkModeMenuItem
              </ListItemIcon>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
