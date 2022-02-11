import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextInput } from '../FormikMuiFields';
import generateBase64Encode from '../../utils/genBase64Encode';
import * as yup from 'yup';
import {
  createNewPost,
  updatePost,
} from '../../redux/actions/postCommentsAction';
import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  Autocomplete,
} from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import PublishIcon from '@mui/icons-material/Publish';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './styles';

const validationSchema = yup.object({
  title: yup.string().required('Required'),
  textSubmission: yup.string(),
  imageSubmission: yup.string(),
  linkSubmission: yup
    .string()
    .matches(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/,
      'Valid URL required'
    ),
});

const PostForm = ({
  postType,
  actionType,
  postToEditType,
  postToEditTitle,
  postToEditSub,
  postToEditId,
  textSubmission,
  linkSubmission,
  fromSubreddit,
}) => {
  const classes = useStyles();
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { subs, auth } = useSelector((state) => state);
  const fileInputOnChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setFieldValue);
  };

  const clearFileSelection = (setFieldValue) => {
    // setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    setFieldValue('imageSubmission', '');
    setFileName('');
  };

  const handleUpdatePost = async (values, { setSubmitting }) => {
    try {
      if (!auth.token) return;

      setSubmitting(true);
      await dispatch(updatePost(postToEditId, values, auth.token));
      setSubmitting(false);
      history.push(`/comments/${postToEditId}`);
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };

  const handleAddPost = async (values, { setSubmitting }) => {
    try {
      if (!auth.token) return;

      setSubmitting(true);
      const postId = await dispatch(createNewPost(values, auth.token));
      setSubmitting(false);
      history.push(`/comments/${postId}`);
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: actionType === 'edit' ? postToEditTitle : '',
          postType: actionType === 'edit' ? postToEditType : postType,
          textSubmission: actionType === 'edit' ? textSubmission : '',
          linkSubmission: actionType === 'edit' ? linkSubmission : '',
          imageSubmission: '',
          subreddit:
            actionType === 'edit'
              ? postToEditSub.id
              : !fromSubreddit
              ? ''
              : fromSubreddit.id,
        }}
        onSubmit={actionType === 'edit' ? handleUpdatePost : handleAddPost}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={classes.form}>
            {actionType !== 'edit' && (
              <ButtonGroup
                color="secondary"
                fullWidth
                className={classes.typeBtnGroup}
              >
                {/* The first way is by using setFieldValue inside the form and pass the "postType" to the outside function
                \components\post\index.jsx
                setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
                const handleTextPost = () => { setPostType('Text') .... */}
                <Button
                  onClick={() => setFieldValue('postType', 'Text')}
                  variant={
                    values.postType === 'Text' ? 'contained' : 'outlined'
                  }
                >
                  <TextFormatIcon style={{ marginRight: 2 }} />
                  Text
                </Button>
                {/* setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
                const handleImagePost = () => {setPostType('Image') ... */}
                <Button
                  onClick={() => setFieldValue('postType', 'Image')}
                  variant={
                    values.postType === 'Image' ? 'contained' : 'outlined'
                  }
                >
                  <ImageIcon style={{ marginRight: 5 }} sx={{ mr: 1 }} />
                  Image
                </Button>
                {/* setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
                const handleLinkPost = () => {setPostType('Link') ... */}
                <Button
                  onClick={() => setFieldValue('postType', 'Link')}
                  variant={
                    values.postType === 'Link' ? 'contained' : 'outlined'
                  }
                >
                  <LinkIcon style={{ marginRight: 5 }} />
                  Link
                </Button>
              </ButtonGroup>
            )}
            <div className={classes.input}>
              <Typography
                className={classes.inputIconText}
                color="primary"
                variant="h5"
                sx={{ mr: 2, fontWeight: 'bold' }}
              >
                r/
              </Typography>
              <Autocomplete
                name="subreddit"
                onChange={(e, value) =>
                  setFieldValue('subreddit', value ? value.id : '')
                }
                fullWidth
                options={subs && subs.allSubs}
                disabled={actionType === 'edit' || !!fromSubreddit}
                getOptionLabel={(option) => option.subredditName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      actionType === 'edit'
                        ? postToEditSub.subredditName
                        : !fromSubreddit
                        ? 'Choose a subreaddit'
                        : fromSubreddit.subredditName
                    }
                    placeholder="Search by name"
                    required
                    disabled={actionType === 'edit' || !!fromSubreddit}
                  />
                )}
              />
            </div>
            <div className={classes.input}>
              <TitleIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="title"
                type="text"
                placeholder="Enter title"
                label="Title"
                required
                fullWidth
                disabled={actionType === 'edit'}
              />
            </div>
            {values.postType === 'Text' && (
              <div className={classes.textInput}>
                <ChatIcon className={classes.inputIcon} color="primary" />
                <TextInput
                  name="textSubmission"
                  placeholder={`Enter text (HTML supported. For ex, "<h1>Like this?</h1>")`}
                  multiline
                  label="Text"
                  required={values.postType === 'Text'}
                  fullWidth
                  variant="outlined"
                  rows={4}
                  maxRows={Infinity}
                />
              </div>
            )}
            {values.postType === 'Image' && (
              <div className={classes.imageInput}>
                <div className={classes.imageBtnsWrapper}>
                  <ImageIcon className={classes.inputIcon} color="primary" />
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    hidden
                    onChange={(e) => fileInputOnChange(e, setFieldValue)}
                    required={values.postType === 'Image'}
                  />
                  <Button
                    component="label"
                    htmlFor="image-upload"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={
                      values.imageSubmission ? (
                        <CheckCircleIcon />
                      ) : (
                        <PublishIcon />
                      )
                    }
                    size={mobile ? 'small' : 'medium'}
                    className={classes.selectBtn}
                  >
                    {values.imageSubmission
                      ? `${mobile ? '' : 'Selected '}"${fileName}"`
                      : `Select Image`}
                  </Button>
                  {values.imageSubmission && (
                    <IconButton
                      onClick={() => clearFileSelection(setFieldValue)}
                      color="secondary"
                      size={mobile ? 'small' : 'medium'}
                      className={classes.clearSelectionBtn}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </div>
                {values.imageSubmission && (
                  <div className={classes.imagePreview}>
                    <img
                      alt={fileName}
                      src={values.imageSubmission}
                      width={mobile ? 250 : 350}
                    />
                  </div>
                )}
              </div>
            )}
            {values.postType === 'Link' && (
              <div className={classes.input}>
                <LinkIcon className={classes.inputIcon} color="primary" />
                <TextInput
                  name="linkSubmission"
                  type="text"
                  placeholder="Enter URL"
                  label="Link"
                  required={values.postType === 'Link'}
                  fullWidth
                  variant={actionType === 'edit' ? 'outlined' : 'standard'}
                />
              </div>
            )}

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
              startIcon={postToEditId ? <EditIcon /> : <PostAddIcon />}
            >
              {postToEditId
                ? isSubmitting
                  ? 'Updating'
                  : 'Update'
                : isSubmitting
                ? 'Posting'
                : 'Post'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
