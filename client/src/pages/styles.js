import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  homepage: {
    minWidth: '98%',
    marginTop: '0.5rem',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginTop: '0',
      display: 'block',
    },
  },
  postsPanel: {
    minWidth: '40vw',
    background: '#ddd',
    flexGrow: 1,
  },
}));
