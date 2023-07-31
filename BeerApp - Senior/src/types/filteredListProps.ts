import { Beer } from './beer';

interface FilteredListProps {
  isLoading: boolean;
  beerList: Array<Beer>;
  savedList: Array<Beer>;
  reloadList: () => void;
  filterData: (query: string) => void;
  handleCheckboxChange: (item: Beer, isChecked: boolean) => void;
}

export type { FilteredListProps };
