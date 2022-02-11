import React from 'react';
import { Container } from '@mui/material';
import { useStyles } from './styles';
import PostDialog from '../components/postDialog';
import TopSubsPanel from '../components/topSubsPanel';
import PostList from '../components/postList';

const Index = () => {
  const classes = useStyles();
  return (
    <Container disableGutters className={classes.homepage}>
      <div className={classes.postsPanel}>
        <PostDialog />
        <PostList />
      </div>
      <TopSubsPanel />
    </Container>
  );
};

export default Index;
