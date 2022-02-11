import React from 'react';
import { Container } from '@mui/material';
import { useStyles } from './styles';
import PostDialog from '../components/post';
import TopSubsPanel from '../components/topSubsPanel';

const Index = () => {
  const classes = useStyles();
  return (
    <Container disableGutters className={classes.homepage}>
      <div className={classes.postsPanel}>
        <PostDialog />
        <h5>PostList</h5>
      </div>
      <TopSubsPanel />
    </Container>
  );
};

export default Index;
