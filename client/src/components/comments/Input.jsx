import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions/postCommentsAction';
import { Link, Typography, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useStyles } from './styles';

const CommentInput = ({ auth, postId, mobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      if (!auth.token) return;

      setSubmitting(true);
      await dispatch(addComment(postId, comment, auth.token));
      setSubmitting(false);
      setComment('');
    } catch (err) {
      setSubmitting(false);
    }
  };
  return (
    <div className={classes.wrapper}>
      {auth ? (
        <Typography variant="body2">
          Comment as{' '}
          <Link component={RouterLink} to={`/u/${auth.username}`}>
            {auth.username}
          </Link>
        </Typography>
      ) : (
        <Typography variant="body1">
          Log in or sign up to leave a comment
        </Typography>
      )}{' '}
      <form className={classes.form} onSubmit={handlePostComment}>
        <TextField
          placeholder={`What are your thoughts?`}
          multiline
          fullWidth
          required
          rows={4}
          rowsMax={Infinity}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          size={mobile ? 'small' : 'medium'}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.commentBtn}
          startIcon={<SendIcon />}
          size={mobile ? 'small' : 'medium'}
          disabled={!auth || submitting}
        >
          {!auth ? 'Login to comment' : submitting ? 'Commenting' : 'Comment'}
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
