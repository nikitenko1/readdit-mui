import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  createSubBtn: { marginTop: '0.5rem' },

  formWrapper: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
    },
  },

  form: {
    marginTop: 10,
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
  input: { display: 'flex', alignItems: 'flex-end' },
  inputIcon: { marginRight: 8 },
  inputIconText: {
    padding: 2,
    paddingBottom: 0,
    marginRight: 10,
    fontWeight: 700,
    wordBreak: 'keep-all',
  },
  descInput: { display: 'flex', alignItems: 'flex-end', marginTop: '1.5rem' },
  submitButton: { marginTop: '1.8em', marginBottom: '0.5em' },
}));
