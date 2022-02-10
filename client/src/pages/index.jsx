import React from 'react';
import { Container } from '@mui/material';
import { useStyles } from './styles';

const Index = () => {
  const classes = useStyles();
  return (
    <Container disableGutters className={classes.homepage}>
      <div className={classes.postsPanel}>
        <h2>Hello</h2>
      </div>
    </Container>
  );
};

export default Index;
