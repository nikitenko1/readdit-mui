import { makeStyles } from '@material-ui/core';
//  { usePostListStyles }
export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '1em',
  },
  noSubscribedPosts: { textAlign: 'center', marginTop: '5rem' },
}));
