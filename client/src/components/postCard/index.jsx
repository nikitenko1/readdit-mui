import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import {
  Paper,
  CardMedia,
  Typography,
  useMediaQuery,
  Link,
  Button,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CommentIcon from '@mui/icons-material/Comment';
import getEditedThumbail from '../../utils/cloudinaryTransform';
import { trimLink, prettifyLink, fixUrl } from '../../utils/formatUrl';
import { UpvoteButton, DownvoteButton } from '../upDownButton';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './styles';
import EditDeleteDialog from '../postEditDelDialog';

const PostCard = ({ post, toggleUpvote, toggleDownvote }) => {
  // const postSchema: title: {}, postType: {}, textSubmission: {}, linkSubmission: {},imageSubmission: {},
  // subreddit: {},author: {}, upvotedBy: [], downvotedBy: [], pointsCount: {}, voteRatio: {},
  // hotAlgo: {}, controversialAlgo: {}, comments: [], commentCount: {}, createdAt: {}, updatedAt: {}

  const classes = useStyles();
  const theme = useTheme();
  const {
    id,
    title,
    postType,
    textSubmission,
    linkSubmission,
    imageSubmission,
    subreddit,
    author,
    upvotedBy,
    downvotedBy,
    pointsCount,
    commentCount,
    createdAt,
    updatedAt,
  } = post;

  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const { auth, darkMode } = useSelector((state) => state);

  const isUpvoted = auth && upvotedBy.includes(auth.id);
  // upvotedBy: 0(pin):"61fe3800fd63ff11544c6b49" id(pin):"61fe3800fd63ff11544c6b49"
  const isDownvoted = auth && downvotedBy.includes(auth.id);

  const handleUpvoteToggle = async () => {
    try {
      if (!auth.token) return;

      if (isUpvoted) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== auth.id);
        dispatch(toggleUpvote(id, updatedUpvotedBy, downvotedBy, auth.token));
      } else {
        const updatedUpvotedBy = [...upvotedBy, auth.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== auth.id);
        dispatch(
          toggleUpvote(id, updatedUpvotedBy, updatedDownvotedBy, auth.token)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownvoteToggle = () => {
    try {
      if (!auth.token) return;

      if (isDownvoted) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== auth.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, upvotedBy, auth.token));
      } else {
        const updatedDownvotedBy = [...downvotedBy, auth.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== auth.id);
        dispatch(
          toggleDownvote(id, updatedDownvotedBy, updatedUpvotedBy, auth.token)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const linkToShow =
    postType === 'Link'
      ? linkSubmission
      : postType === 'Image'
      ? imageSubmission.imageLink
      : '';

  const formattedLink = trimLink(prettifyLink(linkToShow), 30);

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.votesWrapper}>
        <UpvoteButton
          auth={auth}
          body={post}
          handleUpvote={handleUpvoteToggle}
          size={mobile ? 'small' : 'medium'}
        />
        <Typography
          variant="body1"
          style={{
            color: isUpvoted
              ? '#FF8b60'
              : isDownvoted
              ? '#9494FF'
              : darkMode
              ? '#e4e4e4'
              : '#333',
            fontWeight: 600,
          }}
        >
          {pointsCount}
        </Typography>
        <DownvoteButton
          auth={auth}
          body={post}
          handleDownvote={handleDownvoteToggle}
          size={mobile ? 'small' : 'medium'}
        />
      </div>
      <div className={classes.thumbnailWrapper}>
        {postType === 'Text' ? (
          <RouterLink to={`/comments/${id}`}>
            <Paper elevation={0} square className={classes.thumbnail}>
              <MessageIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: '#787878' }}
              />
            </Paper>
          </RouterLink>
        ) : postType === 'Link' ? (
          <a href={fixUrl(linkSubmission)} target="_noblank">
            <Paper elevation={0} square className={classes.thumbnail}>
              <LinkIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: '#787878' }}
              />
            </Paper>
          </a>
        ) : (
          <Paper elevation={0} square className={classes.thumbnail}>
            <CardMedia
              className={classes.thumbnail}
              image={getEditedThumbail(imageSubmission.imageLink)}
              title={title}
              component="a"
              href={imageSubmission.imageLink}
              target="_noblank"
            />
          </Paper>
        )}
      </div>
      <div className={classes.postInfoWrapper}>
        <Typography variant="h6" className={classes.title}>
          {title}
          <Typography variant="caption" color="primary" sx={{ ml: 1 }}>
            <Link
              href={
                postType === 'Link'
                  ? fixUrl(linkSubmission)
                  : postType === 'Image'
                  ? imageSubmission.imageLink
                  : ''
              }
            >
              {formattedLink}
              {postType === 'Text' ? null : (
                <OpenInNewIcon fontSize="inherit" />
              )}
            </Link>
          </Typography>
        </Typography>
        <Typography variant="subtitle2">
          <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
            r/{subreddit.subredditName}
          </Link>
          <Typography
            variant="caption"
            className={classes.userAndDate}
            sx={{ ml: 1 }}
          >
            Posted by{' '}
            <Link component={RouterLink} to={`/u/${author.username}`}>
              u/{author.username}
            </Link>{' '}
            • <TimeAgo datetime={new Date(createdAt)} />
            {createdAt !== updatedAt && '*'}
          </Typography>
        </Typography>
        <div className={classes.bottomBtns}>
          <Button
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            component={RouterLink}
            to={`/comments/${id}`}
            size={mobile ? 'small' : 'medium'}
          >
            {commentCount} comments
          </Button>
          {auth && auth.id === author.id && (
            <EditDeleteDialog
              id={id}
              mobile={mobile}
              title={title}
              postType={postType}
              subreddit={subreddit}
              textSubmission={textSubmission}
              linkSubmission={linkSubmission}
            />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default PostCard;
