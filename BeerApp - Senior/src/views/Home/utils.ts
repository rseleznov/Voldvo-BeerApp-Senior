import { getRandomBeerList, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (
  setData: (data: Array<Beer>) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    } finally {
      setIsLoading(false);
    }
  })();
};

const searchData = (
  query: string,
  setData: (data: Array<Beer>) => void,
  setIsLoading: (isLoading: boolean) => void,
  isAutocomplete: boolean = false
) => {
  (async () => {
    try {
      const { data } = await searchBeerList(query, isAutocomplete);
      setData(data);
    } catch (error) {
      handle(error);
    } finally {
      setIsLoading(false);
    }
  })();
};

const isFavourite = (beer: Beer, savedList: Array<Beer>): boolean => {
  return savedList.findIndex(item => item.id === beer.id, 0) >= 0;
}

const saveFavorites = (beers: Array<Beer>) => {
  localStorage.setItem('favorites', JSON.stringify(beers));
}

const loadFavorites = (): Array<Beer> => {
  const favorites = localStorage.getItem('favorites') || '[]';
  return JSON.parse(favorites);
}

const saveBeerList = (beers: Array<Beer>) => {
  localStorage.setItem('beers', JSON.stringify(beers));
}

const loadBeerList = (): Array<Beer> => {
  const beers = localStorage.getItem('beers') || '[]';
  return JSON.parse(beers);
}

const loadBeer = (id: string): Beer | undefined => {
  let beers: Beer[] = JSON.parse(localStorage.getItem('beers') || '[]');
  let beer = beers.find(item => item.id === id);
  if (!beer) {
    beers = JSON.parse(localStorage.getItem('favorites') || '[]');
    beer = beers.find(item => item.id === id);
  }
  return beer;
}

export {
  fetchData,
  searchData,
  isFavourite,
  saveFavorites,
  loadFavorites,
  saveBeerList,
  loadBeerList,
  loadBeer,
};
