import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from '../upDownButton';
import CommentsAndButtons from '../commentsAndBtn';
// import ReplyAndButtons from './ReplyAndButtons';
import {
  toggleCommentUpvote,
  toggleCommentDownvote,
  toggleReplyUpvote,
  toggleReplyDownvote,
} from '../../redux/actions/postCommentsAction';
import TimeAgo from 'timeago-react';
import { Typography, Link } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { useStyles } from './styles';

const CommentDisplay = ({ comments, postId, mobile, auth }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const commentDetails = (by, comment) => {
    return (
      <>
        <Typography variant="caption">
          <Link component={RouterLink} to={`/u/${by.username}`}>
            {by.username}
          </Link>
          {` ${comment.pointsCount} ${
            comment.pointsCount === 1 ? 'point' : 'points'
          } • `}
          <TimeAgo datetime={new Date(comment.createdAt)} />
          {comment.createdAt !== comment.updatedAt && (
            <em>
              {' • edited'} <TimeAgo datetime={new Date(comment.updatedAt)} />
            </em>
          )}
        </Typography>
      </>
    );
  };

  const handleCommentUpvote = async (commentId) => {
    // upvotedBy --> 0(pin):"61fe3800fd63ff11544c6b49"s
    const { upvotedBy, downvotedBy } = comments.find((c) => c.id === commentId);

    try {
      if (!auth.token) return;

      // id(pin):"61fe3800fd63ff11544c6b49" === 0(pin):"61fe3800fd63ff11544c6b49"
      if (upvotedBy.includes(auth.id)) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== auth.id);
        dispatch(
          toggleCommentUpvote(postId, commentId, updatedUpvotedBy, downvotedBy)
        );
      } else {
        const updatedUpvotedBy = [...upvotedBy, auth.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== auth.id);
        dispatch(
          toggleCommentUpvote(
            postId,
            commentId,
            updatedUpvotedBy,
            updatedDownvotedBy,
            auth.token
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentDownvote = async (commentId) => {
    // upvotedBy --> 0(pin):"61fe3800fd63ff11544c6b49"
    const { upvotedBy, downvotedBy } = comments.find((c) => c.id === commentId);

    try {
      if (!auth.token) return;

      // id(pin):"61fe3800fd63ff11544c6b49" === 0(pin):"61fe3800fd63ff11544c6b49"
      if (downvotedBy.includes(auth.id)) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== auth.id);
        dispatch(
          toggleCommentDownvote(
            postId,
            commentId,
            updatedDownvotedBy,
            upvotedBy,
            auth.token
          )
        );
      } else {
        const updatedDownvotedBy = [...downvotedBy, auth.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== auth.id);
        dispatch(
          toggleCommentDownvote(
            postId,
            commentId,
            updatedDownvotedBy,
            updatedUpvotedBy,
            auth.token
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.commentsContainer}>
      {comments.length !== 0 ? (
        comments.map((c) => (
          <div className={classes.commentWrapper}>
            <div className={classes.commentVotesWrapper}>
              <UpvoteButton
                auth={auth}
                body={c}
                handleUpvote={() => handleCommentUpvote(c.id)}
              />
              <DownvoteButton
                auth={auth}
                body={c}
                handleDownvote={() => handleCommentDownvote(c.id)}
              />
            </div>
            <div className={classes.commentDetails}>
              {commentDetails(c.commentedBy, c)}
              <CommentsAndButtons
                mobile={mobile}
                comment={c}
                postId={postId}
                auth={auth}
              />
            </div>
          </div>
        ))
      ) : (
        <div className={classes.noCommentsBanner}>
          <ForumIcon color="primary" fontSize="large" />
          <Typography variant="h5" color="secondary">
            No Comments Yet
          </Typography>
          <Typography variant="h6" color="secondary">
            Be the first to share what you think!
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CommentDisplay;
