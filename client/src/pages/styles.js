import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vW',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: '100vH',
  },
  homepage: {
    minWidth: '95%',
    marginTop: '0.5rem',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginTop: '0',
      display: 'block',
    },
  },
  postsPanel: {
    minWidth: '40vw',
    flexGrow: 1,
  },
}));
