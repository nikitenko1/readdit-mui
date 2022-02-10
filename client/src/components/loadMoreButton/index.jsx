import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { useStyles } from './styles';

const LoadMoreButton = ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.loadSpinner}>
      <CircularProgress size="6em" disableShrink />
      <Typography color="primary" variant="body1">
        {text}
      </Typography>
    </div>
  );
};

export default LoadMoreButton;
