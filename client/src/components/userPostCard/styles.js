import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mainPaper: {
    display: 'flex',
    marginBottom: '1rem',
    marginRight: '0.8rem',
    textDecoration: 'none',
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  votesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: 35,
    },
  },
  postInfo: {
    paddingTop: '1rem',
    padding: '0.2rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  userAndDate: { marginTop: '0.5rem' },
  title: { fontWeight: 500, marginBottom: '0.7rem' },
  imagePost: { textAlign: 'center' },
  image: {
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    },
    border: '1px solid #e9e3d8',
    borderRadius: 8,
  },
  commentsBtn: { marginTop: '0.5rem' },
}));
