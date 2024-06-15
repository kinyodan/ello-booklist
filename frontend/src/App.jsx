import { useState , useEffect } from 'react';
import axios from "axios";
import './App.css'
import Search from './components/Search'
import BookList from './components/BookList'
import SelectedBooks from './components/SelectedBooks'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Header from "./components/Header"
const baseURL = "http://localhost:4000";
const  query = `query ExampleQuery {
  books {
  author
  coverPhotoURL
  readingLevel
  title
}
}`;

const payload = {
  query: query,
}

const headers = {headers: {'Content-Type': 'application/json', 'x-apollo-operation-name': ""}}

function App() {
  const [booksData, setCount] = useState([])
  const [submitData, setSubmitData] = useState([])
  const [submittedList, setSubmittedList] = useState([])
  const [parsedStoreValues, setParsedStoreValues] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      await axios.post(baseURL,payload,headers ).then((response) => {
        setCount(response.data.data.books)
      })
      return false
    }
    fetchData()
  } ,[])

  useEffect(() => {
    const readData =  localStorage.getItem('selectedBooks')
    let parsedValues = readData? JSON.parse(readData) : []
    checkIfItemExist(parsedValues,submittedList)
  }, [submittedList]);

  function checkIfItemExist(parsedValues,newSubmittedList){
    let newList = []
    newSubmittedList.map((book) => {
      let titleToCheck = book.slug
      const exists = parsedValues.some(item => item.slug === titleToCheck);
      if(!exists){ 
        newList.push(book)
      }
    })
    writeToStorage(parsedValues,newList)
  }

  function writeToStorage(parsedValues,newList){
    const mergedBooksList = [...parsedValues, ...newList];
    localStorage.setItem('selectedBooks', JSON.stringify(mergedBooksList));
    setParsedStoreValues(mergedBooksList.reverse())
  }

  function setSelectedValues(data){
    setSubmitData(data)
  }

  function handleSubmit(data){
    setSubmittedList(data)
  }

  const removeFromReadingList = (book) => {
    let itemIndex = parsedStoreValues.findIndex(x => x.id === book.id);
    parsedStoreValues.splice(itemIndex, 1);
    writeToStorage(parsedStoreValues,[])
  }

  return (
    <>
      <Header />
      <div className="page">
        <div className="wrapper">
          <div className="content-wrapper">
              <Search booksData={booksData} handleSubmitData={handleSubmit} handleSelected={setSelectedValues} selectedList={submitData} />
              <hr/>
              <BookList booksData={booksData} handleSubmitData={handleSubmit} addedToList={parsedStoreValues} removeFromList={removeFromReadingList} />
          </div>
          <div className="sidebar">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" sx={{ backgroundColor: '#11A897', color: 'white', '&:hover': { backgroundColor: '#0E8E7A' } }}>
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Reading List
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
            <div className="reading-list" >
              <SelectedBooks bookListSelected={parsedStoreValues.reverse()} removeFromList={removeFromReadingList} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
