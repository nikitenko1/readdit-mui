import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
} from '@mui/material';
import AuthForm from './authForm';
import { useTheme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useStyles } from './styles';

// https://mui.com/components/dialogs/
const AuthDialog = ({ closeMobileMenu }) => {
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
      {mobile ? (
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
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthDialog;
