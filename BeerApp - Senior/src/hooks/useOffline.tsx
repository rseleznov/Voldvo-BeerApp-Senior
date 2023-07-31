import { useContext } from 'react';
import OfflineContext from '../contexts/OflineContext';

const useOffline = () => {
  return useContext(OfflineContext);
}

export { useOffline };
