import React from 'react';

import { useScrollTrigger, Slide } from '@mui/material';

// https://mui.com/components/app-bar/#usescrolltrigger-options-trigger
// You can use the useScrollTrigger() hook to respond to user scroll actions.
const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
