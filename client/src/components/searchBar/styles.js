import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  search: {
    flexGrow: 0.75,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      padding: '0 1rem',
    },
  },
  inputField: {},
}));
