import React from 'react';
import { Button } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useStyles } from './styles';

const LoadMoreButton = ({ handleLoadPosts, loading }) => {
  const classes = useStyles();
  return (
    <div className={classes.loadBtnWrapper}>
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleLoadPosts}
        startIcon={<AutorenewIcon />}
        className={classes.loadBtn}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load more'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
