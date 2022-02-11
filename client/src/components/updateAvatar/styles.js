import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  imagePreview: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  currentAvatar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '1.4rem',
  },

  imageBtnsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '1.4rem',
  },

  clearSelectionBtn: {
    padding: '0.25rem',
  },
}));
