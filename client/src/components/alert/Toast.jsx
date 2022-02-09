import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ title, body, severity }) => {
  const [open, setOpen] = useState(true);

  return (
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
        sx={{ mb: 2 }}
        severity={severity}
        style={{ top: '5px', right: '5px', zIndex: 50, minWidth: '200px' }}
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
  );
};

export default Toast;
