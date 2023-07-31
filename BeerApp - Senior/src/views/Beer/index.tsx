import { CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeafletMap from '../../components/LeafletMap';
import OfflineContext from '../../contexts/OflineContext';
import { Beer as IBeer, Position } from '../../types';
import { loadBeer } from '../Home/utils';
import styles from './Beer.module.css';
import { fetchData } from './utils';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [position, setPosition] = useState<Position>();
  const { isOffline } = useContext(OfflineContext);

  useEffect(() => {
    if (beer) {
      setPosition({
        lat: parseFloat(beer?.latitude || '0') || 0,
        lng: parseFloat(beer?.longitude || '0') || 0,
      })
    }
  }, [beer])

  const fetchBeer = useCallback(() => {
    if (isOffline && id) {
      setBeer(loadBeer(id));
    } else {
      fetchData(setBeer, id)
    }
  }, [isOffline, id]);

  useEffect(() => fetchBeer(), [fetchBeer]);

  return (
    <article>
      <section>
        <header>
          <Typography variant="h1">{beer?.name || ''}</Typography>
        </header>
        <main>
          <Paper className={styles.paper} sx={{ display: 'flex' }}>
            <Stack
              spacing={2}
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{
                width: '50%',
                height: '100%'
              }}
              direction="column"
            >
              <Stack spacing={2}>
                <Typography className={styles.label}>{beer?.brewery_type || ''}</Typography>
                <Typography variant="h3">
                  Address
                </Typography>
                <Typography className={styles.label}>
                  {`${beer?.address_1 || '_'}, ${beer?.city || '_'}`}
                </Typography>
                <Typography className={styles.label}>
                  {`${beer?.postal_code || '_'} ${beer?.state || '_'}`}
                </Typography>
                <Typography className={styles.label}>
                  {beer?.country || '_'}
                </Typography>
                <Typography variant="h3">
                  Phone
                </Typography>
                <Typography className={styles.label}>
                  {beer?.phone || '_'}
                </Typography>
                <Typography variant="h3">
                  Website
                </Typography>
                <Typography className={styles.label}>
                  {beer?.website_url || '_'}
                </Typography>
                <Typography variant="h3">
                  Location
                </Typography>
                <Typography className={styles.label}>
                  {`${beer?.latitude || '_'}, ${beer?.longitude || '_'}`}
                </Typography>
              </Stack>
            </Stack>
            {
              position
                ? (
                  <React.Suspense fallback="Loading...">
                    <LeafletMap
                      name={beer?.name || ''}
                      position={position}
                    />
                  </React.Suspense>
                )
                : <CircularProgress/>
            }
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Beer;
