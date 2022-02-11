import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  loadMorePosts,
  toggleUpvote,
  toggleDownvote,
} from '../../redux/actions/postAction';
import LoadMoreButton from '../loadMoreButton';
import LoadingSpinner from '../loadingSpinner';
import PostCard from '../postCard';
import { Typography } from '@mui/material';

import { useStyles } from './styles';

const PostList = () => {
  const [sortBy, setSortBy] = useState('hot');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const { posts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {posts && posts.results && !pageLoading ? (
        posts.results.map((post) => (
          <PostCard
            post={post}
            key={post.id}
            toggleUpvote={toggleUpvote}
            toggleDownvote={toggleDownvote}
          />
        ))
      ) : (
        <LoadingSpinner text={'Fetching posts. Wait a sec.'} />
      )}
    </div>
  );
};

export default PostList;
