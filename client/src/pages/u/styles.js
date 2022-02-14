import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: '90vh',
    paddingBottom: '1rem',
  },
  userInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0.5rem',
    marginRight: '1.2rem',
    padding: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '5em',
    height: '5em',
    [theme.breakpoints.down('sm')]: {
      width: '3em',
      height: '3em',
    },
  },
  rightWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 0.3,
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  twoItemsDiv: { textAlign: 'center' },
  cakeDay: {
    display: 'flex',
    alignItems: 'center',
  },
  postsPaper: { margin: '0.5rem' },
  noPosts: { textAlign: 'center', marginTop: '5rem' },
}));
