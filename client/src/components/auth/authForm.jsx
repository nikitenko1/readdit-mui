import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser, loginUser } from '../../redux/actions/userAction';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextInput } from '../FormikMuiFields';
import {
  Button,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useStyles } from './styles';

const validationSchemaSignup = yup.object({
  username: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanumeric characters allowed, no spaces/symbols'
    ),

  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
});

const validationSchemaLogin = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});
const AuthForm = () => {
  const dispatch = useDispatch();
  const [authType, setAuthType] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const classes = useStyles(authType)();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await dispatch(loginUser(values));
    } catch (err) {
      setSubmitting(false);
    }
  };

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await dispatch(signupUser(values));
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={classes.authWrapper}>
        <Formik
          validateOnChange={true}
          initialValues={{ username: '', password: '' }}
          onSubmit={authType === 'login' ? handleLogin : handleSignup}
          validationSchema={
            authType === 'login'
              ? validationSchemaLogin
              : validationSchemaSignup
          }
        >
          {({ isSubmitting }) => (
            <>
              <Form className={classes.form}>
                <Typography
                  variant="h5"
                  color="secondary"
                  className={classes.formTitle}
                >
                  {authType === 'login'
                    ? 'Login to your account'
                    : 'Create a new account'}
                </Typography>
                <div className={classes.input}>
                  <PersonIcon className={classes.inputIcon} color="primary" />
                  <TextInput
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    label="Username"
                    required
                    fullWidth
                  />
                </div>
                <div className={classes.input}>
                  <LockIcon className={classes.inputIcon} color="primary" />
                  <TextInput
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter password"
                    label="Password"
                    required
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass(!showPass)}>
                            {showPass ? (
                              <VisibilityOffIcon color="primary" />
                            ) : (
                              <VisibilityIcon color="primary" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  startIcon={
                    authType === 'login' ? <ExitToAppIcon /> : <PersonAddIcon />
                  }
                  className={classes.submitButton}
                  disabled={isSubmitting}
                >
                  {authType === 'login'
                    ? isSubmitting
                      ? 'Logging In'
                      : 'Login'
                    : isSubmitting
                    ? 'Signing Up'
                    : 'Sign Up'}
                </Button>
              </Form>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <div className={classes.sidePanel}>
                <Typography
                  variant="h6"
                  className={classes.switchText}
                  color="primary"
                >
                  {authType === 'login'
                    ? `Don't have an account?`
                    : 'Already have an account?'}
                </Typography>
                <Button
                  onClick={() =>
                    authType === 'login'
                      ? setAuthType('signup')
                      : setAuthType('login')
                  }
                  fullWidth
                  size="large"
                  color="primary"
                  variant="outlined"
                  startIcon={
                    authType === 'login' ? <PersonAddIcon /> : <ExitToAppIcon />
                  }
                  disabled={isSubmitting}
                >
                  {authType === 'login' ? 'Sign Up' : 'Login'}
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
