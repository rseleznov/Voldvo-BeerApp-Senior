import { Alert, AlertTitle } from '@mui/material';
import { useContext } from 'react';
import OfflineContext from '../../contexts/OflineContext';

const Offline = () => {
  const { isOffline } = useContext(OfflineContext);

  return (
    isOffline
      ? (
        <Alert severity="warning">
          <AlertTitle>You are offline</AlertTitle>
          App needs internet to start working!
        </Alert>
      )
      : null
  )
};

export default Offline;
