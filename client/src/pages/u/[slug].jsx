import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loadUserPosts } from '../../redux/actions/userPageAction';
import LoadingSpinner from '../../components/loadingSpinner';
import LoadMoreButton from '../../components/loadMoreButton';
import UserPostCard from '../../components/userPostCard';
import { getCircularAvatar } from '../../utils/cloudinaryTransform';

import {
  Container,
  Paper,
  useMediaQuery,
  Typography,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import { useStyles } from './styles';

const UserPage = () => {
  const [page, setPage] = useState(1);

  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  //
  const classes = useStyles();
  const theme = useTheme();
  const userInfo = useSelector((state) => state.userPage);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  //
  const { slug } = useParams();

  useEffect(() => {
    const getUser = async () => {
      await dispatch(fetchUser(slug));
      setPageLoading(false);
    };
    getUser();
  }, [dispatch, slug]);

  if (!userInfo || pageLoading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text="Fetching user data..." />
        </Paper>
      </Container>
    );
  }

  const {
    avatar,
    username: userName,
    createdAt,
    posts,
    totalComments,
    karmaPoints,
  } = userInfo.userDetails;

  const handleLoadPosts = async () => {
    setLoadingMore(true);
    await dispatch(loadUserPosts(slug, page + 1));
    setPage((prevState) => prevState + 1);
    setLoadingMore(false);
  };

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper className={classes.userInfoWrapper} variant="outlined">
          <div className={classes.avatarWrapper}>
            {avatar && avatar.exists ? (
              <Avatar
                alt={userName}
                src={getCircularAvatar(avatar.imageLink)}
                className={classes.avatar}
              />
            ) : (
              <Avatar
                style={{ backgroundColor: '#941a1c' }}
                className={classes.avatar}
              >
                <h1>{userName[0]}</h1>
              </Avatar>
            )}
            <Typography variant="h6" color="secondary">
              u/{slug}
            </Typography>
          </div>
          <div className={classes.rightWrapper}>
            <div className={classes.itemWrapper}>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  Cake Day
                </Typography>

                <Typography
                  variant="body1"
                  color="secondary"
                  className={classes.cakeDay}
                >
                  <span style={{ fontSize: '1.0rem', marginLeft: '1rem' }}>
                    <CakeIcon />
                  </span>
                  <span>
                    {String(new Date(createdAt))
                      .split(' ')
                      .slice(1, 4)
                      .join(' ')}
                  </span>
                </Typography>
              </div>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  <strong>{posts.length}</strong> Posts
                </Typography>
                <Typography variant="body1" color="secondary">
                  <strong>{totalComments}</strong> Comments
                </Typography>
              </div>
            </div>
            <div className={classes.itemWrapper}></div>
            <div className={classes.twoItemsDiv}>
              <Typography variant="body1" color="secondary">
                Karma
              </Typography>
              <Typography variant="body1" color="secondary">
                {karmaPoints.commentKarma + karmaPoints.postKarma}
              </Typography>
            </div>
            <div className={classes.twoItemsDiv}>
              <Typography variant="body1" color="secondary">
                Post Karma <strong>{karmaPoints.postKarma}</strong>
              </Typography>
              <Typography variant="body1" color="secondary">
                Comment Karma <strong>{karmaPoints.commentKarma}</strong>
              </Typography>
            </div>
          </div>
        </Paper>
        <div className={classes.postsPaper}>
          {userInfo.posts.results.length !== 0 ? (
            userInfo.posts.results.map((p) => (
              <UserPostCard key={p.id} post={p} auth={auth} isMobile={mobile} />
            ))
          ) : (
            <div className={classes.noPosts}>
              <PersonIcon color="primary" fontSize="large" />
              <Typography variant="h5" color="secondary">
                <strong>u/{userName}</strong> has not made any posts yet
              </Typography>
            </div>
          )}
        </div>
        {'next' in userInfo.posts && (
          <LoadMoreButton
            handleLoadPosts={handleLoadPosts}
            loading={loadingMore}
          />
        )}
      </Paper>
    </Container>
  );
};

export default UserPage;
