import { useEffect, useState } from 'react';
import OfflineContext from '../contexts/OflineContext';
import { OfflineProviderProps } from '../types';

const OfflineProvider = (props: OfflineProviderProps) => {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const { children } = props;

  useEffect(() => {
    const handleOfflineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('offline', handleOfflineStatus);
    window.addEventListener('online', handleOfflineStatus);

    return () => {
      window.removeEventListener('offline', handleOfflineStatus);
      window.removeEventListener('online', handleOfflineStatus);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline }}>
      {children}
    </OfflineContext.Provider>
  );
};

export default OfflineProvider;