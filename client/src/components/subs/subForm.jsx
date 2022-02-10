import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewSub } from '../../redux/actions/subAction';
import { Formik, Form } from 'formik';
import { TextInput } from '../FormikMuiFields';
import * as yup from 'yup';
import { useStyles } from './styles';
import { Button, Typography } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';

const validationSchema = yup.object({
  subredditName: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanumeric characters allowed, no spaces/symbols'
    ),
  description: yup
    .string()
    .required('Required')
    .max(100, 'Must be at most 100 characters')
    .min(3, 'Must be at least 3 characters'),
});

const SubForm = ({ onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state) => state);
  const handleCreateSub = async (values, { setSubmitting }) => {
    try {
      if (!auth.token) return;

      setSubmitting(true);
      await dispatch(addNewSub(values, auth.token));
      onClose();
      history.push(`/r/${values.subredditName}`);
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        validateOnChange={true}
        initialValues={{ subredditName: '', description: '' }}
        onSubmit={handleCreateSub}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.input}>
              <Typography
                className={classes.inputIconText}
                color="primary"
                variant="h5"
              >
                r/
              </Typography>
              <TextInput
                placeholder="Enter name"
                label="Subreaddit Name"
                required
                fullWidth
                variant="outlined"
                name="subredditName"
                type="text"
              />
            </div>
            <div className={classes.descInput}>
              <InfoIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="description"
                type="text"
                placeholder="Enter description"
                label="Description"
                required
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                maxRows={Infinity}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
              startIcon={<AddIcon />}
            >
              {isSubmitting ? 'Creating' : 'Create Subreaddit'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubForm;
