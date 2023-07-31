import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React, { useCallback } from 'react';
import { ALIGN, Beer, SORT } from '../../types';

interface HeadCell {
  disablePadding?: boolean;
  id: keyof Beer;
  label?: string;
  numeric?: boolean;
  align?: ALIGN;
  disabled?: boolean;
}

const HEAD_CELLS: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: '',
    align: 'center',
    disabled: true,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Brewery name',
    align: 'left',
  },
  {
    id: 'brewery_type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
    align: 'center',
    disabled: true,
  },
  {
    id: 'country',
    numeric: false,
    disablePadding: false,
    label: 'Country',
    align: 'center',
  },
  {
    id: 'state',
    numeric: true,
    disablePadding: false,
    label: 'State',
    align: 'center',
    disabled: true,
  },
  {
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'City',
    align: 'center',
  },
];

interface BreweryTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Beer) => void;
  order: SORT;
  orderBy: string;
}

function BreweryTableHead(props: BreweryTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = useCallback(
    (property: keyof Beer) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    }, [onRequestSort]);

  return (
    <TableHead>
      <TableRow>
        {HEAD_CELLS.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? headCell.align : headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={e => createSortHandler(headCell.id)(e)}
              disabled={headCell.disabled}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default BreweryTableHead;