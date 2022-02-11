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
        classes={{ paper: classes.dialogWrapper }}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle onClose={handleClose}>Create a new subreaddit</DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <SubForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubDialog;
