import React from 'react';

interface FilterInputProps {
  filterData: (query: string) => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export type { FilterInputProps };