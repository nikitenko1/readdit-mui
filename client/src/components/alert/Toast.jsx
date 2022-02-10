import React, { useState } from 'react';
import { Box, IconButton, Collapse, AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ title, body, severity }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mr: 1.5 }}
          severity={severity}
        >
          <AlertTitle>{title}</AlertTitle>

          {typeof body === 'string' ? (
            body
          ) : (
            <ul>
              {body.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          )}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Toast;
