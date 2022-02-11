import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Dialog,
  DialogContent,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
} from '@mui/material';
import { DialogTitle } from '../title/DialogTitle';
import AuthForm from './authForm';
import { useTheme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useStyles } from './styles';

// https://mui.com/components/dialogs/
const AuthDialog = ({ closeMobileMenu, type }) => {
  const classes = useStyles();
  const theme = useTheme();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileMenu = () => {
    handleClickOpen();
    closeMobileMenu();
  };
  return (
    <div>
      {type === 'upvote' ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={mobile ? 'small' : 'medium'}
        >
          <ArrowUpwardIcon style={{ color: '#b2b2b2' }} />
        </IconButton>
      ) : type === 'downvote' ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={mobile ? 'small' : 'medium'}
        >
          <ArrowDownwardIcon style={{ color: '#b2b2b2' }} />
        </IconButton>
      ) : mobile ? (
        <MenuItem onClick={handleMobileMenu}>
          <ListItemIcon>
            <ExitToAppIcon style={{ marginRight: 7 }} />
            Login/Register
          </ListItemIcon>
        </MenuItem>
      ) : (
        <Button
          color="primary"
          onClick={handleClickOpen}
          className={classes.navButtons}
        >
          Login/Register
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogContent>
          <DialogTitle></DialogTitle>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthDialog;
