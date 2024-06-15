import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SelectedBooks({bookListSelected =[],removeFromList}) {

  return (
    <>
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {bookListSelected.map((book,index) => (
        <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
            <Avatar alt={book.title} src={`src/${book.coverPhotoURL}`} variant="square" sx={{ width: 95, height: 95 }} />
            </ListItemAvatar>
            <ListItemText
            primary={book.title}
            secondary={
                <React.Fragment>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                </Typography>
                {`Author: ${book.author}`}
                </React.Fragment>
            }
            />
            <Button component="label" role={undefined} 
              onClick={()=>{removeFromList(book)}} 
              variant="contained" 
              tabIndex={-1} 
              sx={{ backgroundColor: '#11A897', color: 'white', '&:hover': { backgroundColor: '#0E8E7A' } }}
              startIcon={<DeleteIcon />}>
              from reading list
            </Button>
        </ListItem>
      ))} 
    </List>
    </>
  );
}

