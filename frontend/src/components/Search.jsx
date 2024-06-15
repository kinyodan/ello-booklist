import * as React from 'react';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createSvgIcon } from '@mui/material/utils';

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

function Search(props) { 
  
  const [selectedValue, setSelectedValue] = useState([]);
  props.booksData.map((book, index) =>{
    props.booksData.id = index
  })      
  
  const seenTitles = new Set();
  const uniqueBooks = props.booksData.filter(book => {
    const isDuplicate = seenTitles.has(book.title);
    seenTitles.add(book.title);
    return !isDuplicate;
  });

  function setParams(value){
    setSelectedValue(value)
    props.handleSelected(value)
  }

  function submitData(data){
    props.handleSubmitData(data)
    setSelectedValue([])
  }

  return (
    <>
    <Stack spacing={0} sx={{ width: 900 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={26}>
          <Grid item xs={30}>
              <Autocomplete
              multiple
              id="tags-outlined"
              onChange={(event,value) => (setParams(value))}
              value={selectedValue}
              options={uniqueBooks}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField key={params.title}
                  {...params} 
                  label="Type to Select books"
                  placeholder="Favorites"
                />
              )}
              renderOption={(uniqueBooks, option) => (
                <li {...uniqueBooks} key={option.id}>
                  <Avatar alt="book image" variant="square" src={`src/${option.coverPhotoURL}`} />
                  {option.title}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={30}>
              <Button variant="outlined" startIcon={<PlusIcon />} size="medium" onClick={() => {submitData(props.selectedList)}} >Add to Reading List</Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
    </>
  );
}

export default Search

