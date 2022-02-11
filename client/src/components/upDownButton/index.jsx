import React from 'react';
import AuthDialog from '../auth';

import { Checkbox } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const UpvoteButton = ({ auth, body, handleUpvote, size }) => {
  return auth ? (
    <Checkbox
      checked={body.upvotedBy.includes(auth.id)}
      icon={<ArrowUpwardIcon style={{ color: '#b2b2b2' }} />}
      checkedIcon={<ArrowUpwardIcon style={{ color: '#FF8b60' }} />}
      onChange={handleUpvote}
      size={size || 'small'}
    />
  ) : (
    <AuthDialog type="upvote" />
  );
};

export const DownvoteButton = ({ auth, body, handleDownvote, size }) => {
  return auth ? (
    <Checkbox
      checked={body.downvotedBy.includes(auth.id)}
      icon={<ArrowDownwardIcon style={{ color: '#b2b2b2' }} />}
      checkedIcon={<ArrowDownwardIcon style={{ color: '#9494FF' }} />}
      onChange={handleDownvote}
      size={size || 'small'}
    />
  ) : (
    <AuthDialog type="downvote" />
  );
};
