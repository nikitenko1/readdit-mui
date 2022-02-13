import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  commentBody: {},
  inputDiv: { display: 'flex', flexDirection: 'column' },
  submitBtns: { alignSelf: 'flex-end', marginTop: '0.2rem' },
  btnBar: { display: 'flex' },
  btnStyle: { textTransform: 'none' },
  cancelBtn: { marginRight: '0.2rem', marginTop: '0.1rem' },
}));
