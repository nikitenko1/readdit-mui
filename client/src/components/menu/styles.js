import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  userBtn: {
    textTransform: 'none',
    display: 'flex',
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '0.1em',
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      marginRight: '0.5rem',
    },
  },

  navItems: {
    display: 'flex',
    alignItems: 'center',
  },
  karmaWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
