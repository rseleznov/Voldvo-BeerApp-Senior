import { TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { FilterInputProps } from '../../types';

const FilterInput = (props: FilterInputProps) => {
  const { filterData, filter, setFilter } = props;
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const filterString = e.target.value;
    setFilter(filterString)
    if (filterString.length > 2) {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      setSearchTimer(
        setTimeout(() => {
          filterData(filterString);
        }, 500)
      );
    }
    return () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
    };
  }, [filterData, searchTimer, setFilter]);

  return (
    <TextField
      label='Filter...'
      variant='standard'
      value={filter}
      onChange={handleInputChange}
    />
  )
};

export default FilterInput;
