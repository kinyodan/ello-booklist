import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import BookCard from './BookCard'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

export default function BookList(props) {
  const [currentPage, setCurrentPage] = useState(1) 
  let booksPerPage = 9
  let pageCount = Math.round(props.booksData.length/9)+1
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = props.booksData.slice(indexOfFirstBook, indexOfLastBook);

  const checKIfAddedToReadingList = (selected) => {
    let titleToCheck = selected.slug
    const exists = props.addedToList.some(item => item.slug === titleToCheck);
    return exists 
  }

  const handleChange = (event, value)=>{
    setCurrentPage(value)
  }

  function setSlug(book){
    let slugText = book.title+book.author
    return slugText
    .toLowerCase()        
    .replace(/\s+/g, '_')    
    .replace(/[^\w\-]+/g, ''); 
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {currentBooks.map((book, index) => (
            book.id = index,
            book.slug = setSlug(book),
            <Grid xs={6} key={index} >
              <BookCard book={book} 
                handleSubmitData={props.handleSubmitData} 
                isAddedToList={checKIfAddedToReadingList(book)} 
                removeItem ={props.removeFromList}
              />
            </Grid>
          ))}
        </Grid>
        <Divider></Divider>
        <br/>
        <Pagination count={pageCount} page={currentPage} onChange={handleChange} variant="outlined" shape="rounded" />
      </Box> 
      </Container>
    </React.Fragment>
  );
}