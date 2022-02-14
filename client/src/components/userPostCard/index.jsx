import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleUpvote,
  toggleDownvote,
} from '../../redux/actions/userPageAction';
import { UpvoteButton, DownvoteButton } from '../upDownButton';
import TimeAgo from 'timeago-react';
import ReactHtmlParser from 'html-react-parser';
import { trimLink, prettifyLink, fixUrl } from '../../utils/formatUrl';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CommentIcon from '@mui/icons-material/Comment';
import { Paper, Typography, Link, Button } from '@mui/material';
import { useStyles } from './styles';

const UserPostCard = ({ post, auth, mobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state);

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
        dispatch(toggleUpvote(id, updatedUpvotedBy, updatedDownvotedBy));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownvoteToggle = async () => {
    try {
      if (!auth.token) return;

      if (isDownvoted) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== auth.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, upvotedBy, auth.token));
      } else {
        const updatedDownvotedBy = [...downvotedBy, auth.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== auth.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, updatedUpvotedBy));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formattedLink =
    postType === 'Link' && trimLink(prettifyLink(linkSubmission), 70);

  const trimmedText =
    textSubmission &&
    (textSubmission.length < 100
      ? textSubmission
      : textSubmission.slice(0, 100).concat('...'));
  return (
    <Paper variant="outlined" className={classes.mainPaper}>
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
      <div
        className={classes.postInfo}
        component={RouterLink}
        to={`/comments/${id}`}
      >
        <Typography variant="subtitle2">
          <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
            {`r/${subreddit.subredditName} `}
          </Link>
          <Typography variant="caption" className={classes.userAndDate}>
            • Posted by
            <Link component={RouterLink} to={`/u/${author.username}`}>
              {` u/${author.username} `}
            </Link>
            • <TimeAgo datetime={new Date(createdAt)} />
            {createdAt !== updatedAt && (
              <em>
                {' • edited'} <TimeAgo datetime={new Date(updatedAt)} />
              </em>
            )}
          </Typography>
        </Typography>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        {postType === 'Text' ? (
          <Typography variant="body1">
            {ReactHtmlParser(trimmedText)}
          </Typography>
        ) : postType === 'Image' ? (
          <a
            href={imageSubmission.imageLink}
            alt={title}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.imagePost}
          >
            <img
              alt={title}
              src={imageSubmission.imageLink}
              className={classes.image}
            />
          </a>
        ) : (
          <Link href={fixUrl(linkSubmission)}>
            {formattedLink} <OpenInNewIcon fontSize="inherit" />
          </Link>
        )}
        <div>
          <Button
            color="primary"
            size="small"
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            component={RouterLink}
            to={`/comments/${id}`}
          >
            {commentCount} Comments
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default UserPostCard;
