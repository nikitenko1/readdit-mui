import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: '90vh',
  },
  topPortion: { display: 'flex' },
  votesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
    [theme.breakpoints.down('sm')]: {
      width: 35,
    },
  },
  postDetails: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem',
  },
  title: { fontWeight: 500, marginBottom: '0.7rem' },
  imagePost: {},
  image: {
    width: '40%',
    border: '1px solid #e9e3d8',
    borderRadius: 8,
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    },
  },
  bottomBar: {
    display: 'flex',
    marginTop: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  bottomButton: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  commentIcon: {
    marginRight: 10,
  },
  divider: { marginBottom: '1rem' },
}));
