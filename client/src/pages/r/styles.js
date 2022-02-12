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
  subInfoWrapper: {
    margin: '0.5rem',
    padding: '0.8rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    margin: '0.3rem 0',
    maxWidth: 300,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  inputDiv: { display: 'flex', flexDirection: 'column' },
  submitBtns: {
    alignSelf: 'flex-end',
    marginTop: '0.2rem',
  },
  cancelBtn: {
    marginRight: '0.2rem',
  },
  iconText: {
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  secondPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  noPosts: { textAlign: 'center', marginTop: '5em' },
}));
