
import React from 'react';
import Alert from '@mui/material/Alert';

function AlertMessage({ severity, message }) {
  return <Alert  color="warning" severity={severity}>{message} </Alert>;
}

export default AlertMessage;