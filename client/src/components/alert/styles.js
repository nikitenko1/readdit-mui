import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    minWidth: '90wh',
    position: 'fixed',
    textAlign: 'center',
    background: '#0007',
    color: 'white',
    top: 0,
    left: 0,
    zIndex: 99,
    '& svg': {
      fontSize: '5px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '1.2px',
      animation: '$text_loading 1s ease-in-out infinite',
    },
    '& polygon': {
      strokeDasharray: 22,
      strokeDashoffset: 1,
      animation:
        '$dash_polygon 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate-reverse',
    },
  },
  '@keyframes text_loading': {
    '50%': {
      opacity: 0.1,
    },
  },
  '@keyframes dash_polygon': {
    to: {
      strokeDashoffset: 234,
    },
  },
}));
