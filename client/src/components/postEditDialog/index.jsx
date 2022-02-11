import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteDialog from '../deleteDialog';
import PostDialog from '../postDialog';
import { removePost } from '../../redux/actions/postAction';
import { IconButton, Menu } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const EditDeleteDialog = ({
  id,
  title,
  postType,
  subreddit,
  buttonType,
  textSubmission,
  linkSubmission,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { auth } = useSelector((state) => state);
  const handleDeletePost = async () => {
    try {
      if (!auth.token) return;

      await dispatch(removePost(id, auth.token));
      if (location.pathname !== '/') {
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {buttonType === 'buttonGroup' ? (
        <div style={{ display: 'flex' }}>
          <PostDialog
            actionType="edit"
            handleMenuClose={handleClose}
            postToEditType={postType}
            postToEditTitle={title}
            postToEditSub={subreddit}
            postToEditId={id}
            textSubmission={textSubmission}
            linkSubmission={linkSubmission}
          />
          <DeleteDialog
            title={title}
            handleDelete={handleDeletePost}
            handleMenuClose={handleClose}
          />
        </div>
      ) : (
        <div>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div>
              <PostDialog
                actionType="edit"
                handleMenuClose={handleClose}
                postToEditType={postType}
                postToEditTitle={title}
                postToEditSub={subreddit}
                postToEditId={id}
                textSubmission={textSubmission}
                linkSubmission={linkSubmission}
              />
            </div>
            <DeleteDialog
              title={title}
              handleDelete={handleDeletePost}
              handleMenuClose={handleClose}
            />
          </Menu>
        </div>
      )}
    </div>
  );
};

export default EditDeleteDialog;
