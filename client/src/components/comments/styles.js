import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  // input
  wrapper: {
    margin: '0.5rem',
  },
  form: { display: 'flex', flexDirection: 'column' },
  commentBtn: { alignSelf: 'flex-end', marginTop: '0.2rem' },

  // display comments
  commentsContainer: {
    marginLeft: '0.7rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.3rem',
    },
  },
  wholeComment: { marginBottom: '1rem' },
  commentWrapper: {
    display: 'flex',
  },
  commentVotesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  commentDetails: { display: 'flex', flexDirection: 'column', padding: '1rem' },
  replyWrapper: {
    marginBottom: '0.2rem',
    display: 'flex',
    marginLeft: '2rem',
  },

  noCommentsBanner: { textAlign: 'center', marginTop: '5rem' },

  // Sort Comments
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
  },
}));
