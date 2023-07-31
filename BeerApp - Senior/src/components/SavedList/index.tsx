import { Button, Checkbox, Container, Link, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Beer, SavedListProps } from '../../types';

const SavedList = (props: SavedListProps) => {
  const { savedList, setSavedList } = props;

  const handleCheckboxChange = useCallback((item: Beer) => {
    setSavedList((savedList) =>
      savedList.filter((selectedItem) => selectedItem.id !== item.id)
    );
  }, [setSavedList]);

  return (
    <Paper>
      <Container>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant='h3'>Saved items</Typography>
            <Button variant="contained" size="small" onClick={() => setSavedList([])}>
              Remove all items
            </Button>
          </Stack>
          <List>
            {savedList.map((beer, index) => (
              <ListItem key={index.toString()}>
                <Checkbox
                  checked
                  onChange={() => handleCheckboxChange(beer)}
                />
                <Link component={RouterLink} to={`/beer/${beer.id}`}>
                  {beer.name}
                </Link>
              </ListItem>
            ))}
            {!savedList.length && <p>No saved items</p>}
          </List>
        </Stack>
      </Container>
    </Paper>

  )
}

export default SavedList;
