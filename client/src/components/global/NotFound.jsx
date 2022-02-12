import React from 'react';
import { ReactComponent as Error404 } from '../../svg/404-error.svg';

import { Container, Paper, Typography, SvgIcon } from '@mui/material';
import { useStyles } from './styles';

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <div className={classes.textWrapper}>
          <SvgIcon color="primary" className={classes.icon}>
            <Error404 />
          </SvgIcon>
          <Typography color="secondary" variant="h4">
            Page Not Found
          </Typography>
          <Typography color="secondary" variant="h6">
            The page you requested does not exist
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
