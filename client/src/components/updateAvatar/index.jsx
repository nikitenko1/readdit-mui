import React, { useState } from 'react';
import { useStyles } from './styles';
import UpdateAvatarForm from './updateForm';
import { DialogTitle } from '../title/DialogTitle';
import { Dialog, DialogContent, MenuItem, ListItemIcon } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

const UpdateAvatarDialog = ({ handleCloseMenu, user }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <FaceIcon style={{ marginRight: 7 }} />
          {user.avatar.exists ? 'Change Avatar' : 'Add Avatar'}
        </ListItemIcon>
      </MenuItem>{' '}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        classes={{ paper: classes.dialogWrapper }}
        fullWidth
      >
        <DialogTitle onClose={handleClose}>
          {user.avatar.exists ? 'Update your avatar' : 'Add an avatar'}
        </DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <UpdateAvatarForm
            closeModal={handleClose}
            onCloseDialog={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateAvatarDialog;
