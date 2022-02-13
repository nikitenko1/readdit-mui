import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  left: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
    },
  },
  left_wrapper: {
    marginRight: theme.spacing(10),
  },
  logo: {
    fontFamily: 'Varela Round',
    textTransform: 'none',
    fontSize: '1.3rem',
    padding: '0.1rem',
    marginRight: '0.3rem',
  },
  searchBtn: { padding: '0.2rem' },
}));
