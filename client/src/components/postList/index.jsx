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
import SortTabBar from '../sortTabBar';
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

  const handleTabChange = async (newValue) => {
    try {
      setPageLoading(true);
      if (sortBy !== 'subscribed') {
        await dispatch(fetchPosts(newValue));
      } else {
        if (!auth.token) return;
        await dispatch(fetchPosts(newValue, auth.token));
      }
      setSortBy(newValue);
      setPageLoading(false);

      if (page !== 1) {
        setPage(1);
      }
    } catch (err) {
      setPageLoading(false);
      console.log(err);
    }
  };

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      if (sortBy !== 'subscribed') {
        await dispatch(loadMorePosts(sortBy, page + 1));
      } else {
        if (!auth.token) return;
        await dispatch(loadMorePosts(sortBy, page + 1, auth.token));
      }

      await dispatch(loadMorePosts(sortBy, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      setLoadingMore(false);
      console.log(err);
    }
  };
  return (
    <div className={classes.root}>
      <SortTabBar
        sortBy={sortBy}
        handleTabChange={handleTabChange}
        subscribedTab={true}
        user={auth}
      />
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
      {sortBy === 'subscribed' && posts.results.length === 0 && (
        <div className={classes.noSubscribedPosts}>
          <Typography variant="h5" color="secondary">
            No Posts Found
          </Typography>
          <Typography variant="h6" color="secondary">
            Subscribe to more subs if you haven't!
          </Typography>
        </div>
      )}
      {sortBy === 'subscribed' && posts.results.length === 0 && (
        <div className={classes.noSubscribedPosts}>
          <Typography variant="h5" color="secondary">
            No Posts Found
          </Typography>
          <Typography variant="h6" color="secondary">
            Subscribe to more subs if you haven't!
          </Typography>
        </div>
      )}
      {posts && 'next' in posts && !pageLoading && (
        <LoadMoreButton
          handleLoadPosts={handleLoadPosts}
          loading={loadingMore}
        />
      )}
    </div>
  );
};

export default PostList;
