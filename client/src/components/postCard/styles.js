import { makeStyles } from '@material-ui/core';
// useCardStyles
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 'auto',
    borderRadius: 0,
  },
  votesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 30,
    backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
  },
  thumbnailWrapper: {
    alignSelf: 'center',
    marginLeft: 5,
  },
  thumbnail: {
    fontSize: '2rem',
    width: 70,
    height: 90,
    textAlign: 'center',
    backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
    borderRadius: 8,
    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 80,
    },
  },
  thumbnailIcon: {
    marginTop: 30,
  },
  postInfoWrapper: { padding: 10, paddingBottom: 0 },
  title: {
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      margin: 0,
    },
  },

  bottomBtns: { display: 'flex' },
  commentsBtn: {
    textTransform: 'none',
    color: theme.palette.type === 'light' ? '#787878' : '#dadada',
  },
}));
