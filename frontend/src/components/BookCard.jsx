import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';
import Divider from '@mui/material/Divider';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DeleteIcon from '@mui/icons-material/Delete';

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function BookCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let book = props.book

  const submitBook = () => {
    props.handleSubmitData([book])
  }

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <Divider></Divider>
      <Divider></Divider>
      {props.isAddedToList ? (
        <CardActions disableSpacing>
          <Button component="label" 
          role={undefined} 
          onClick={()=>{props.removeItem(book)}} 
          variant="contained" 
          tabIndex={-1} 
          sx={{ backgroundColor: '#11A897', color: 'white', '&:hover': { backgroundColor: '#0E8E7A' } }}
          startIcon={<DeleteIcon />}>
            from reading list
          </Button>
        </CardActions>) : (
        <CardActions disableSpacing>
          <Button variant="outlined" className='add-reding-list-btn' onClick={submitBook} startIcon={<PlusIcon />}> 
            Add to reading list
          </Button>
        </CardActions>)
      }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <AutoStoriesIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={book.title}
        subheader= {book.author}
      />
      <CardMedia
        component="img"
        height="194"
        image={`src/${book.coverPhotoURL}`}
        alt={book.title}
      />
    </Card>
    </>
  );
}