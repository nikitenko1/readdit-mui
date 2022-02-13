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
  infoPaper: {
    padding: '0.8rem',
    display: 'flex',
    alignItems: 'flex-start',
  },
  noResults: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1em',
  },
  sorryIcon: {
    marginRight: '7px',
    fontSize: '4rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));
