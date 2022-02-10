import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postAvatar, deleteAvatar } from '../../redux/actions/userAction';
import generateBase64Encode from '../../utils/genBase64Encode';
import { Button, useMediaQuery, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PublishIcon from '@mui/icons-material/Publish';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FaceIcon from '@mui/icons-material/Face';
import { useStyles } from './styles';
import { ALERT } from '../../redux/types/alertType';
import DeleteDialog from '../deleteDialog';

const UpdateAvatarForm = ({ closeModal }) => {
  const classes = useStyles();
  const theme = useTheme();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState('');
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const target = e.target;
    const files = target.files;
    if (files) {
      const file = files[0];
      setAvatar({ avatarInput: file });
      setFileName(file.name);
      generateBase64Encode(file, setAvatar, true);
    }
  };

  const clearfileSelection = () => {
    setAvatar('');
    setFileName('');
  };

  const handleAvatarUpload = async () => {
    try {
      if (!avatar) {
        return dispatch({
          type: ALERT,
          payload: {
            warning: `Oops, Select an image file first.`,
          },
        });
      }
      if (!auth.token) return;
      setIsLoading(true);

      await dispatch(postAvatar(avatar, auth.token));
      setIsLoading(false);

      setAvatar('');
      setFileName('');
      closeModal();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      if (!auth.token) return;
      await dispatch(deleteAvatar(auth.token));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {auth?.avatar?.exists && (
        <div>
          <div className={classes.imagePreview}>
            <img
              alt={auth.username + '-avatar'}
              src={auth.avatar.imageLink}
              width={150}
            />
          </div>
          <div className={classes.currentAvatar}>
            <Typography variant="h6" color="secondary">
              Current Avatar
            </Typography>
            <DeleteDialog type="avatar" handleDelete={handleRemoveAvatar} />
          </div>
        </div>
      )}
      <div>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          hidden
          onChange={handleFileInputChange}
        />

        <Button
          component="label"
          htmlFor="image-upload"
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={avatar ? <CheckCircleIcon /> : <PublishIcon />}
          className={classes.selectBtn}
        >
          {avatar
            ? `${mobile ? '' : 'Selected '}"${fileName}"`
            : `Select Image`}
        </Button>
        {avatar && (
          <IconButton
            onClick={clearfileSelection}
            color="secondary"
            size={mobile ? 'small' : 'medium'}
            className={classes.clearSelectionBtn}
          >
            <CancelIcon />
          </IconButton>
        )}
      </div>
      {avatar && (
        <div className={classes.imagePreview}>
          <img alt={fileName} src={avatar} width={mobile ? 250 : 350} />
        </div>
      )}

      <Button
        size={mobile ? 'medium' : 'large'}
        variant="contained"
        color="secondary"
        className={classes.submitButton}
        fullWidth
        startIcon={<FaceIcon />}
        onClick={handleAvatarUpload}
        disabled={isLoading}
      >
        {auth?.avatar?.exists
          ? isLoading
            ? 'Updating'
            : 'Update avatar'
          : isLoading
          ? 'Adding'
          : 'Add avatar'}
      </Button>
    </div>
  );
};

export default UpdateAvatarForm;
