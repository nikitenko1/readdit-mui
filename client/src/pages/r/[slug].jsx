import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSub,
  toggleUpvote,
  toggleDownvote,
  toggleSubscribe,
  editDescription,
  loadSubPosts,
} from '../../redux/actions/subPageAction';
import { ALERT } from '../../redux/types/alertType';
import SortTabBar from '../../components/sortTabBar';
import PostCard from '../../components/postCard';
import LoadMoreButton from '../../components/loadMoreButton';
import PostDialog from '../../components/postDialog';
import LoadingSpinner from '../../components/loadingSpinner';
import {
  Container,
  Paper,
  Typography,
  Button,
  Link,
  TextField,
} from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useStyles } from './styles';

const SubPage = () => {
  const classes = useStyles();

  const [editOpen, setEditOpen] = useState(false);
  const [descInput, setDescInput] = useState('');
  const [sortBy, setSortBy] = useState('hot');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);

  const { slug } = useParams();

  const dispatch = useDispatch();

  const { auth, subPage } = useSelector((state) => state);
  useEffect(() => {
    const getSub = async () => {
      try {
        await dispatch(fetchSub(slug, 'hot'));
        setPageLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getSub();
  }, [slug, dispatch]);

  useEffect(() => {
    if (subPage) {
      setDescInput(subPage.subDetails.description);
    }
  }, [subPage]);

  if (!subPage || pageLoading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text={'Fetching sub data...'} />
        </Paper>
      </Container>
    );
  }

  const {
    subredditName,
    subscribedBy,
    subscriberCount,
    description,
    admin,
    createdAt,
    id,
  } = subPage.subDetails;

  const isSubscribed = auth && subscribedBy.includes(auth.id);

  const handleEditDescription = async () => {
    if (!auth.token) return;

    await dispatch(editDescription(id, descInput, auth.token));
    setEditOpen(false);
    dispatch({
      type: ALERT,
      payload: {
        success: `Updated description of your sub: r/${subredditName}`,
      },
    });
  };

  const handleSubJoin = async () => {
    try {
      let updatedSubscribedBy = [];
      if (isSubscribed) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== auth.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, auth.id];
      }

      if (!auth.token) return;

      await dispatch(toggleSubscribe(id, updatedSubscribedBy, auth.token));
      let message = isSubscribed
        ? `Unsubscribed from r/${subredditName}`
        : `Subscribed to r/${subredditName}!`;
      dispatch({
        type: ALERT,
        payload: {
          success: message,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabChange = async (e, newValue) => {
    try {
      setPostsLoading(true);
      await dispatch(fetchSub(slug, newValue));
      setSortBy(newValue);
      setPostsLoading(false);

      if (page !== 1) {
        setPage(1);
      }
    } catch (err) {
      console.log(err);
      setPostsLoading(false);
    }
  };

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadSubPosts(slug, sortBy, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper variant="outlined" className={classes.subInfoWrapper}>
          <div>
            <Typography variant="h6" color="secondary">
              r/{subredditName}
            </Typography>
            <div className={classes.description}>
              {!editOpen ? (
                <Typography variant="body1">{description}</Typography>
              ) : (
                <div className={classes.inputDiv}>
                  <TextField
                    multiline
                    required
                    fullWidth
                    rows={2}
                    rowsMax={Infinity}
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  <div className={classes.submitBtns}>
                    <Button
                      onClick={() => setEditOpen(false)}
                      color="primary"
                      variant="outlined"
                      size="small"
                      className={classes.cancelBtn}
                      style={{ padding: '0.2em' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEditDescription}
                      color="primary"
                      variant="outlined"
                      size="small"
                      style={{ padding: '0.2em' }}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              )}
              {auth && auth.id === admin.id && !editOpen && (
                <Button
                  onClick={() => setEditOpen(!editOpen)}
                  size="small"
                  variant="outlined"
                  color="primary"
                  style={{ padding: '0.2rem', marginLeft: '0.5rem' }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </div>
            <Typography
              variant="body2"
              className={classes.iconText}
              color="secondary"
            >
              <CakeIcon style={{ marginRight: 5 }} /> Created
              {' ' +
                String(new Date(createdAt)).split(' ').slice(1, 4).join(' ')}
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              className={classes.iconText}
            >
              <PersonIcon style={{ marginRight: 5 }} />
              Admin:
              <Link
                component={RouterLink}
                to={`/u/${admin.username}`}
                style={{ marginLeft: '0.3em' }}
              >
                u/{admin.username}
              </Link>
            </Typography>
          </div>
          <div className={classes.secondPanel}>
            {auth && (
              <Button
                color="primary"
                variant="contained"
                startIcon={isSubscribed ? <CheckIcon /> : <AddIcon />}
                className={classes.joinBtn}
                onClick={handleSubJoin}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            )}
            <Typography
              variant="body2"
              color="primary"
              className={classes.iconText}
            >
              <GroupIcon style={{ marginRight: 5 }} />
              {subscriberCount} subscribers
            </Typography>
          </div>
        </Paper>
        <PostDialog fromSubreddit={{ subredditName, id }} />
        <SortTabBar sortBy={sortBy} handleTabChange={handleTabChange} />
        {postsLoading ? (
          <LoadingSpinner text={'Fetching subreddit posts...'} />
        ) : (
          <>
            <div>
              {subPage.posts.results.length !== 0 ? (
                subPage.posts.results.map((p) => (
                  <PostCard
                    key={p.id}
                    post={p}
                    toggleUpvote={toggleUpvote}
                    toggleDownvote={toggleDownvote}
                  />
                ))
              ) : (
                <div className={classes.noPosts}>
                  <PostAddIcon color="primary" fontSize="large" />
                  <Typography variant="h5" color="secondary">
                    No Posts Yet
                  </Typography>
                  <Typography variant="h6" color="secondary">
                    Be the first one to post in r/{subredditName}!
                  </Typography>
                </div>
              )}
            </div>
            {'next' in subPage.posts && (
              <LoadMoreButton
                handleLoadPosts={handleLoadPosts}
                loading={loadingMore}
              />
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default SubPage;
