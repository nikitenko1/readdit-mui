import { makeStyles } from '@material-ui/core';

export const useStyles = (authType) =>
  makeStyles((theme) => ({
    navButtons: {
      '&:hover': {
        backgroundColor: '#ffe5d8',
      },
    },
    dialogWrapper: {},
    authWrapper: {
      display: 'flex',
      flexDirection: authType === 'login' ? 'row' : 'row-reverse',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        marginTop: 10,
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      [theme.breakpoints.down('sm')]: {
        padding: '0 0 0 0',
      },
    },
    formTitle: {
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    input: {},
    inputIcon: {
      marginRight: 8,
    },
    submitButton: {
      marginTop: '1.8rem',
    },
    divider: { marginLeft: 40, marginRight: 40 },
    sidePanel: { padding: 20, margin: 'auto 0' },
    switchText: {
      textAlign: 'center',
      marginBottom: '1.2rem',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 0,
        fontSize: '1rem',
      },
    },
  }));
