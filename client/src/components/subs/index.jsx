import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useStyles } from './styles';
import { DialogTitle } from '../title/DialogTitle';
import SubForm from './subForm';

// https://mui.com/components/dialogs/
const SubDialog = ({ type, handleCloseMenu }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileMenu = () => {
    handleOpen();
    handleCloseMenu();
  };
  return (
    <div>
      {type !== 'mobile' ? (
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpen}
          fullWidth
          className={classes.createSubBtn}
          size="large"
          startIcon={<AddCircleIcon />}
        >
          Create New Subreaddit
        </Button>
      ) : (
        <MenuItem onClick={handleMobileMenu}>
          <ListItemIcon>
            <AddCircleIcon style={{ marginRight: 7 }} />
            Create Subreaddit
          </ListItemIcon>
        </MenuItem>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        classes={{ paper: classes.dialogWrapper }}
        fullWidth
      >
        <DialogTitle>Create a new subreddish</DialogTitle>
        <DialogContent>
          <SubForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubDialog;