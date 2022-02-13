import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TimeAgo from 'timeago-react';
import {
  fetchPostComments,
  toggleUpvote,
  toggleDownvote,
} from '../../redux/actions/postCommentsAction';
import { UpvoteButton, DownvoteButton } from '../../components/upDownButton';
import EditDeleteDialog from '../../components/postEditDelDialog';
import { trimLink, prettifyLink, fixUrl } from '../../utils/formatUrl';
import ReactHtmlParser from 'html-react-parser';
// parse('<p>Hello, World!</p>'); // React.createElement('p', {}, 'Hello, World!')
import CommentDisplay from '../../components/comments/Display';
import SortComments from '../../components/comments/SortComments';
import CommentInput from '../../components/comments/Input';
import LoadingSpinner from '../../components/loadingSpinner';
import {
  Container,
  Paper,
  useMediaQuery,
  Typography,
  Link,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CommentIcon from '@mui/icons-material/Comment';
import { useStyles } from './styles';

const PostCommentsPage = () => {
  const classes = useStyles();
  const { slug: postId } = useParams();
  // page: "comments" slug: "62070beae7b5a50188d326e4" = useParams()

  const post = useSelector((state) => state.postComments);
  const { auth, darkMode } = useSelector((state) => state);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();

  const theme = useTheme();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getComments = async () => {
      try {
        await dispatch(fetchPostComments(postId));
        setPageLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, [postId, dispatch]);

  if (!post || pageLoading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text={'Fetching post comments...'} />
        </Paper>
      </Container>
    );
  }

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
    comments,
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
        dispatch(toggleDownvote(id, updatedDownvotedBy, upvotedBy));
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

  const formattedLink =
    postType === 'Link' && trimLink(prettifyLink(linkSubmission), 70); // 70 charLimit

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <div className={classes.topPortion}>
          <div className={classes.votesWrapper}>
            <UpvoteButton
              auth={auth}
              body={post}
              handleUpvote={handleUpvoteToggle}
              mobile={mobile ? 'small' : 'medium'}
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
          <div className={classes.postDetails}>
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
              <div>{ReactHtmlParser(textSubmission)}</div>
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
            <div className={classes.bottomBar}>
              <MenuItem className={classes.bottomButton}>
                <ListItemIcon>
                  <CommentIcon className={classes.commentIcon} />
                  <Typography variant="subtitle2">{commentCount}</Typography>
                </ListItemIcon>
              </MenuItem>
              {auth && auth.id === author.id && (
                <EditDeleteDialog
                  id={id}
                  mobile={mobile}
                  title={title}
                  postType={postType}
                  subreddit={subreddit}
                  buttonType="buttonGroup"
                  textSubmission={textSubmission}
                  linkSubmission={linkSubmission}
                />
              )}
            </div>
            <CommentInput auth={auth} postId={id} mobile={mobile} />
            <SortComments />
          </div>
        </div>
        <Divider className={classes.divider} />
        <CommentDisplay
          auth={auth}
          comments={comments}
          postId={id}
          mobile={mobile}
        />
      </Paper>
    </Container>
  );
};

export default PostCommentsPage;
