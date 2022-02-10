import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mainPaper: {
    padding: '0.5rem',
    marginLeft: '0.5rem',
    borderRadius: 0,
    minWidth: '25%',
  },
  listPaper: { padding: '1rem' },
  title: { marginBottom: '1rem', textAlign: 'center' },
  listWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
}));
