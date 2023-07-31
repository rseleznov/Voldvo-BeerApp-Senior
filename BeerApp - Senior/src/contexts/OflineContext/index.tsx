import { createContext } from 'react';

interface OfflineContextType {
  isOffline: boolean;
}

const OfflineContext = createContext<OfflineContextType>({
  isOffline: false,
});

export default OfflineContext;
