import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchResults,
  toggleUpvote,
  toggleDownvote,
  loadSearchPosts,
} from '../../redux/actions/searchAction';
import PostCard from '../../components/postCard';
import LoadMoreButton from '../../components/loadMoreButton';
import LoadingSpinner from '../../components/loadingSpinner';

import { Container, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useStyles } from './styles';

const SearchResults = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  // {page: 'search', slug: 'vue'}
  const { slug: query } = useParams();
  const searchResults = useSelector((state) => state.search);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        setPageLoading(true);
        await dispatch(setSearchResults(query));
        setPageLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getSearchResults();
    setPage(1);
  }, [dispatch, query]);

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadSearchPosts(query, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!searchResults || pageLoading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text={'Searching for matches...'} />
        </Paper>
      </Container>
    );
  }
  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper variant="outlined">
          <Typography
            variant="h6"
            color="secondary"
            className={classes.infoPaper}
          >
            <SearchIcon fontSize="large" style={{ marginRight: '7px' }} />
            Showing search results for "{query}"
          </Typography>
        </Paper>
        {searchResults.results.length !== 0 ? (
          searchResults.results.map((s) => (
            <PostCard
              key={s.id}
              post={s}
              toggleUpvote={toggleUpvote}
              toggleDownvote={toggleDownvote}
              auth={auth}
            />
          ))
        ) : (
          <Typography variant="h5" className={classes.noResults}>
            <SentimentVeryDissatisfiedIcon
              className={classes.sorryIcon}
              color="primary"
            />
            Sorry, there were no post results for "{query}"
          </Typography>
        )}
        {'next' in searchResults && (
          <LoadMoreButton
            handleLoadPosts={handleLoadPosts}
            loading={loadingMore}
          />
        )}
      </Paper>
    </Container>
  );
};

export default SearchResults;
