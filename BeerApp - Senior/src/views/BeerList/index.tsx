import { EventBusy, Liquor, SportsBar } from '@mui/icons-material';
import {
  Avatar,
  Box,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreweryTableHead from '../../components/BreweryTableHead';
import OfflineContext from '../../contexts/OflineContext';
import { useBeerMeta } from '../../hooks';
import { Beer, SORT } from '../../types';
import { loadBeerList, saveBeerList } from '../Home/utils';
import styles from './BeerList.module.css';
import { fetchData, wordToColor } from './utils';

const AVATARS = new Map<string, ReactNode>([
  ['micro', <SportsBar/>],
  ['nano', <SportsBar/>],
  ['regional', <SportsBar/>],
  ['brewpub', <Liquor/>],
  ['large', <SportsBar/>],
  ['planning', <SportsBar/>],
  ['bar', <Liquor/>],
  ['contract', <SportsBar/>],
  ['proprietor', <SportsBar/>],
  ['closed', <EventBusy/>],
]);

const BeerList = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = React.useState<SORT>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Beer>('name');

  const navigate = useNavigate();
  const { isOffline } = useContext(OfflineContext);
  const { totalCount = 0 } = useBeerMeta();

  const handleChangePage = useCallback((
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value));
  }, []);

  const handleRequestSort = useCallback((
    _event: React.MouseEvent<unknown>,
    property: keyof Beer,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [order, orderBy]);

  const fetchBreweryList = useCallback(() => {
    if (isOffline) {
      setBeerList(loadBeerList);
    } else {
      setIsLoading(true);
      fetchData(setBeerList, setIsLoading, {
        page: currentPage + 1,
        per_page: rowsPerPage,
        sort: `${orderBy}:${order}`,
      })
    }
  }, [isOffline, currentPage, rowsPerPage, order, orderBy]);

  const onBeerClick = useCallback((id: string) => navigate(`/beer/${id}`), [navigate]);

  useEffect(() => {
    fetchBreweryList();
  }, [fetchBreweryList]);

  useEffect(() => {
    if (isOffline) {
      return;
    }
    saveBeerList(beerList);
  }, [isOffline, beerList]);

  return (
    <article>
      <section>
        <header>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <h1>BeerList page</h1>
          </Stack>
        </header>
        <main>
          <Box>
            <Paper>
              {
                isLoading
                  ? <LinearProgress className={styles.linearProgress}/>
                  : <Box className={styles.linearProgress}/>
              }
              <TableContainer>
                <Table
                  aria-labelledby="tableTitle"
                >
                  <BreweryTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {
                      beerList
                        .map(beer => (
                          <TableRow
                            hover
                            onClick={() => onBeerClick(beer.id)}
                            key={beer.id}
                            className={styles.tableRow}
                          >
                            <TableCell align="center">
                              <Avatar sx={{ bgcolor: `${wordToColor(beer.brewery_type)}` }}>
                                {AVATARS.get(beer.brewery_type)}
                              </Avatar>
                            </TableCell>
                            <TableCell align="left">{beer.name}</TableCell>
                            <TableCell align="center">{beer.brewery_type}</TableCell>
                            <TableCell align="center">{beer.country}</TableCell>
                            <TableCell align="center">{beer.state}</TableCell>
                            <TableCell align="center">{beer.city}</TableCell>
                          </TableRow>
                        ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>

        </main>
      </section>
    </article>
  );
};

export default BeerList;
