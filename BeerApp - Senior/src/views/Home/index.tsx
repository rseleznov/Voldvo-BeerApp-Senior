import { Stack } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import FilteredList from '../../components/FilteredList';
import SavedList from '../../components/SavedList';
import OfflineContext from '../../contexts/OflineContext';
import { Beer } from '../../types';
import {
  fetchData,
  loadBeerList,
  loadFavorites,
  saveBeerList,
  saveFavorites,
  searchData
} from './utils';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>(loadFavorites());
  const [isLoading, setIsLoading] = useState(false);
  const { isOffline } = useContext(OfflineContext);

  const getBeerList = useCallback(() => {
    if (isOffline) {
      setBeerList(loadBeerList);
    } else {
      setIsLoading(true);
      fetchData(setBeerList, setIsLoading)
    }
  }, [isOffline]);

  const filterData = useCallback((query: string) => {
    if (isOffline) {
      setBeerList(loadBeerList);
    } else {
      setIsLoading(true);
      searchData(query, setBeerList, setIsLoading, false);
    }
  }, [isOffline]);

  const handleCheckboxChange = useCallback((item: Beer, isChecked: boolean) => {
    if (isChecked) {
      setSavedList((savedList) => [...savedList, item]);
    } else {
      setSavedList((savedList) =>
        savedList.filter((selectedItem) => selectedItem.id !== item.id)
      );
    }
  }, [setSavedList]);

  const reloadList = useCallback(() => getBeerList(), [getBeerList]);

  useEffect(() => getBeerList(), [getBeerList]);

  useEffect(() => {
    saveFavorites(savedList);
  }, [savedList]);

  useEffect(() => {
    if (isOffline) {
      return;
    }
    saveBeerList(beerList);
  }, [isOffline, beerList]);

  return (
    <article>
      <section>
        <main>
          <Stack spacing={2}>
            <FilteredList
              isLoading={isLoading}
              beerList={beerList}
              savedList={savedList}
              reloadList={reloadList}
              handleCheckboxChange={handleCheckboxChange}
              filterData={filterData}
            />
            <SavedList
              savedList={savedList}
              setSavedList={setSavedList}
            />
          </Stack>
        </main>
      </section>
    </article>
  );
};

export default Home;
