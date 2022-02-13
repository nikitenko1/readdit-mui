import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortComments } from '../../redux/actions/postCommentsAction';

import { Select, MenuItem, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { useStyles } from './styles';

const SortComments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState('old');

  const handleSortComments = (value) => {
    setSortBy(value);
    dispatch(sortComments(value));
  };

  return (
    <div className={classes.root}>
      <Typography variant="button" className={classes.label}>
        <SortIcon style={{ marginRight: '8px' }} color="primary" />
        Sort By
      </Typography>
      <form>
        <Select value={sortBy}>
          <MenuItem value="old" onClick={() => handleSortComments('old')}>
            Old
          </MenuItem>
          <MenuItem value="new" onClick={() => handleSortComments('new')}>
            New
          </MenuItem>
          <MenuItem
            value="upvoted"
            onClick={() => handleSortComments('upvoted')}
          >
            Most Upvoted
          </MenuItem>
          <MenuItem
            value="downvoted"
            onClick={() => handleSortComments('downvoted')}
          >
            Most Downvoted
          </MenuItem>
          <MenuItem
            value="replied"
            onClick={() => handleSortComments('replied')}
          >
            Most Replied
          </MenuItem>
        </Select>
      </form>
    </div>
  );
};

export default SortComments;
