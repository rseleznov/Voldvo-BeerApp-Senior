import { useEffect, useState } from 'react';
import { getBeerMetaData } from '../api';
import { BeerMeta } from '../types';
import handle from '../utils/error';

const useBeerMeta = (): BeerMeta => {
  const [meta, setMeta] = useState<BeerMeta>({ totalCount: 0 });

  useEffect(() => {
    getBeerMetaData()
      .then(response => {
        setMeta({ totalCount: parseInt(response.data.total) })
      })
      .catch(error => {
        handle(error);
      })
  }, []);

  return meta;
}

export { useBeerMeta };
