import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 999,
  },
  createPostWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    borderRadius: 0,
    marginBottom: 10,
    padding: 6,
  },
  createBtn: {
    marginLeft: 8,
    justifyContent: 'flex-start',
    textTransform: 'none',
  },
  iconGroup: { display: 'flex' },
  dialogWrapper: {
    padding: 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  // form
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      padding: '0 0 0 0',
    },
  },
  typeBtnGroup: { marginBottom: 5 },
  input: { display: 'flex', alignItems: 'flex-end', marginTop: '0.7rem' },

  clearSelectionBtnText: {
    padding: 2,
    paddingBottom: 0,
    marginRight: 9,
    fontWeight: 700,
    wordBreak: 'keep-all',
  },
  clearSelectionBtn: { marginRight: 8 },
  textInput: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '1.5rem',
  },
  inputIconText: {
    padding: 2,
    paddingBottom: 0,
  },
  inputIcon: { marginRight: 8 },
  imageInput: { marginTop: '1rem' },
  imageBtnsWrapper: { display: 'flex', alignItems: 'flex-end' },
  imagePreview: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0.7rem',
  },
  submitButton: { marginTop: '0.7rem' },
}));
