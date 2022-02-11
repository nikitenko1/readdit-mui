import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  header_left: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
    },
  },
  header_left_logo: {
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  searchBtn: {
    padding: '0.2rem',
  },
}));
