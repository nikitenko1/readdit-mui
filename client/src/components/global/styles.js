import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      marginTop: '0.5rem',
      display: 'flex',
      flexDirection: 'column',

      borderRadius: 0,
      minHeight: '100vh',
      paddingBottom: '1rem',
      textAlign: 'center',
    },
    textWrapper: {
      marginTop: '15%',
      [theme.breakpoints.down('sm')]: {
        marginTop: '20%',
      },
    },
    icon: {
      fontSize: '8em',
      marginBottom: '0.3em',
    },
  }),
  { index: 1 }
);
