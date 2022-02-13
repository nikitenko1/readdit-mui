import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteDialog from '../deleteDialog';
import {
  addReply,
  editComment,
  deleteComment,
} from '../../redux/actions/postCommentsAction';
import { TextField, Button, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import { useStyles } from './styles';

const CommentAndButtons = ({ isMobile, comment, postId, auth }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [editInput, setEditInput] = useState(comment.commentBody);
  const [submitting, setSubmitting] = useState(false);

  const handleEditComment = async () => {
    try {
      if (!auth.token) return;

      setSubmitting(true);
      await dispatch(editComment(postId, comment.id, editInput, auth.token));
      setSubmitting(false);
      setEditOpen(false);
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };

  const handleCommentDelete = async () => {
    try {
      if (!auth.token) return;

      await dispatch(deleteComment(postId, comment.id, auth.token));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostReply = async () => {
    try {
      if (!auth.token) return;

      setSubmitting(true);
      await dispatch(addReply(postId, comment.id, replyInput, auth.token));
      setSubmitting(false);
      setReplyOpen(false);
      setReplyInput('');
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };
  return (
    <div>
      {!editOpen ? (
        <Typography variant="body2">{comment.commentBody}</Typography>
      ) : (
        <div className={classes.inputDiv}>
          <TextField
            multiline
            fullWidth
            rows={2}
            rowsMax={Infinity}
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          />
          <div className={classes.submitBtns}>
            <Button
              onClick={() => setEditOpen(false)}
              color="primary"
              variant="outlined"
              size="small"
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditComment}
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
              size="small"
              disabled={submitting}
            >
              {submitting ? 'Updating' : 'Update'}
            </Button>
          </div>
        </div>
      )}
      <div className={classes.btnBar}>
        {auth && (
          <Button
            size="small"
            color="inherit"
            startIcon={<ReplyIcon />}
            className={classes.btnStyle}
            onClick={() => setReplyOpen(!replyOpen)}
          >
            Reply
          </Button>
        )}
        {auth && auth.id === comment.commentedBy.id && (
          <>
            <Button
              size="small"
              color="inherit"
              startIcon={<EditIcon />}
              className={classes.btnStyle}
              onClick={() => setEditOpen((prevState) => !prevState)}
            >
              Edit
            </Button>
            <DeleteDialog type="comment" handleDelete={handleCommentDelete} />
          </>
        )}
      </div>{' '}
      {replyOpen && (
        <div className={classes.inputDiv}>
          <TextField
            placeholder={`Reply to ${comment.commentedBy.username}'s comment`}
            multiline
            required
            fullWidth
            rows={4}
            rowsMax={Infinity}
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          />
          <div className={classes.submitBtns}>
            <Button
              onClick={() => setReplyOpen(false)}
              color="primary"
              variant="outlined"
              size="small"
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostReply}
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
              size="small"
              disabled={submitting}
            >
              {submitting ? 'Replying' : 'Reply'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentAndButtons;
