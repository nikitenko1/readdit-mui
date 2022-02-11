import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Fab,
  IconButton,
  Paper,
  Avatar,
  useMediaQuery,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';

import { useDispatch, useSelector } from 'react-redux';
import HideOnScroll from '../hideOnScroll';
import { DialogTitle } from '../title/DialogTitle';

import { getCircularAvatar } from '../../utils/cloudinaryTransform';
import PostForm from './postForm';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './styles';

const PostDialog = ({ actionType, handleMenuClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  //
  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState('Text');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextPost = () => {
    setPostType('Text');
    handleClickOpen();
  };

  const handleImagePost = () => {
    setPostType('Image');
    handleClickOpen();
  };

  const handleLinkPost = () => {
    setPostType('Link');
    handleClickOpen();
  };

  const handleMenuClick = () => {
    handleClickOpen();
    handleMenuClose();
  };

  if (!auth) {
    return null;
  }
  return (
    <div>
      {actionType === 'edit' ? (
        <MenuItem onClick={handleMenuClick}>
          <ListItemIcon>
            <EditIcon style={{ marginRight: 7 }} />
            Edit Post
          </ListItemIcon>
        </MenuItem>
      ) : mobile ? (
        <HideOnScroll>
          <Fab
            className={classes.fab}
            color="primary"
            onClick={handleClickOpen}
          >
            <PostAddIcon />
          </Fab>
        </HideOnScroll>
      ) : (
        <Paper variant="outlined" className={classes.createPostWrapper}>
          {auth.avatar && auth.avatar.exists ? (
            <Avatar
              alt={auth.username}
              src={getCircularAvatar(auth.avatar.imageLink)}
            />
          ) : (
            <Avatar className={classes.defaultAvatar}>
              {auth.username[0]}
            </Avatar>
          )}
          <Button
            color="primary"
            variant="outlined"
            onClick={handleTextPost}
            fullWidth
            className={classes.createBtn}
            startIcon={<PostAddIcon />}
            size="large"
          >
            Create Post
          </Button>
          <div className={classes.iconGroup}>
            <IconButton onClick={handleImagePost}>
              <ImageIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleLinkPost}>
              <LinkIcon color="primary" />
            </IconButton>
          </div>
        </Paper>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogWrapper }}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle onClose={handleClose}>
          {actionType === 'edit' ? 'Update your post' : 'Add a new post'}
        </DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <PostForm actionType={actionType} postType={postType} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDialog;
