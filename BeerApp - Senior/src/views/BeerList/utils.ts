import { getBeerList } from '../../api';
import { ApiParams, Beer } from '../../types';
import handle from '../../utils/error';

export const fetchData = (
  setData: (data: Array<Beer>) => void,
  setIsLoading: (isLoading: boolean) => void,
  params?: ApiParams
) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      handle(error);
    }
  })();
};

export const wordToColor = (word: string): string => {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = word.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}