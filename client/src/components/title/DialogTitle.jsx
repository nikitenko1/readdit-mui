import React from 'react';
import { Typography, IconButton } from '@mui/material';

import MuiDialogTitle from '@material-ui/core/DialogTitle';

import CloseIcon from '@mui/icons-material/Close';

export const DialogTitle = (props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disabletypography="true"
      sx={{
        margin: 8,
        paddingBottom: 8,
      }}
      {...other}
    >
      <Typography variant="node" color="primary">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 30,
            top: 10,
            color: (theme) => theme.palette.primary.main,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
