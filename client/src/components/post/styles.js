import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 999,
  },
  createPostWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    borderRadius: 0,
    marginBottom: 10,
    padding: 6,
  },
}));
