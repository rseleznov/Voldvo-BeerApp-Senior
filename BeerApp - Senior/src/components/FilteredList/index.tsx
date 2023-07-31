import {
  Button,
  Checkbox,
  Container,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FilteredListProps } from '../../types';
import { isFavourite } from '../../views/Home/utils';
import FilterInput from '../FilterInput';

const FilteredList = (props: FilteredListProps) => {
  const { isLoading, beerList, savedList, reloadList, filterData, handleCheckboxChange } = props;
  const [filter, setFilter] = useState('');

  return (
    <Paper>
      <Container>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <FilterInput filterData={filterData} filter={filter} setFilter={setFilter}/>
            <Button
              variant="contained"
              onClick={() => {
                reloadList();
                setFilter('');
              }}
            >
              Reload list
            </Button>
          </Stack>
          {
            isLoading
              ? <LinearProgress/>
              : <List>
                {beerList.map((beer, index) => (
                  <ListItem key={index.toString()}>
                    <ListItemIcon>
                      <Checkbox
                        checked={isFavourite(beer, savedList)}
                        onChange={({ target }) => handleCheckboxChange(beer, target.checked)}
                      />
                    </ListItemIcon>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
          }
        </Stack>
      </Container>
    </Paper>
  )
}

export default FilteredList;
