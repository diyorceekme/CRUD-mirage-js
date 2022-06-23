import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import MiniDrawer from "./Dashboard";
import "../servers/product-server"
import "../servers/category-server"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [books, setBooks] = useState(null)
  const [movieId, setMovieId] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [booksCategory, setBooksCategory] = useState(null)
  const [booksBrand, setBooksBrand] = useState(null)

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(json => setBooks(json.movies))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch('/api/books/category')
      .then(res => res.json())
      .then(json => setBooksCategory(json.movies))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch('/api/books/brand')
      .then(res => res.json())
      .then(json => setBooksBrand(json.movies))
      .catch(err => console.log(err))
  }, [])

  const creatingBook = async () => {
    try {
      const res = await fetch('/api/books', {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          category,
          brand
        })
      })
      const json = await res.json()
      setBooks([...books, json.movie])
      setName('')
      setPrice('')
      setCategory('')
      setBrand('')
    } catch (error) {
      console.log(error)
    }
  }

  const updatingBook = async () => {
    try {
      const res = await fetch(`/api/books/${movieId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          price,
          category,
          brand
        })
      })
      const json = await res.json()
      const moviesCopy = [...books]
      const index = books.findIndex(m => m.id === movieId)
      moviesCopy[index] = json.movie
      setBooks(moviesCopy)
      setName('')
      setPrice('')
      setCategory('')
      setBrand('')
      setUpdating(false)
      setMovieId(null)
    } catch (error) {
      console.log(error)
    }
  }

  const submitForm = async (event) => {
    event.preventDefault();

    if(updating){
      updatingBook()
    }    else{
      creatingBook()
    }
  }

  const deleteBook = async (id) => {
    try {
      await fetch(`/api/books/${id}`, { method: "DELETE" })

      setBooks(books.filter(m => m.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  const setBookToUpdate = (id) => {
    const book = books.find(m => m.id === id)
    setUpdating(true)
    setMovieId(book.id)
    setName(book.name)
    setPrice(book.price)
    setCategory(book.category)
    setBrand(book.brand)
  }

  return (
    <>
      <MiniDrawer />
      <Container style={{ marginTop: "150px" }}>
      <div className="App" style={{ justifyContent: "center" }}>
        <h1 style={{ fontWeight: "normal", textAlign: "center", marginY: 3 }}>Books</h1>
        <div style={{ marginY: 4 }}>
          <form onSubmit={submitForm}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <TextField type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: "20px" }} />
              </div>
              <Box>
                <FormControl>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={e => setCategory(e.target.value)}
                    style={{ width: "200px" }}
                  >
                    {booksCategory?.map(item => (
                      <MenuItem value={item.name}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    value={brand}
                    label="Brand"
                    onChange={e => setBrand(e.target.value)}
                    style={{ width: "200px" }}
                  >
                    {booksBrand?.map(item => (
                      <MenuItem value={item.name}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <div>
                <TextField type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={{ marginBottom: "20px" }} />
              </div>
              <div>
                <button type = "submit"style = {{ backgroundColor: "#28a745",border: "none",color: "white",width: "55px",height: "55px",borderRadius: "5px" }} >
                  {updating ? <EditIcon /> : <AddIcon />  }
                </button>
              </div>
            </div>
          </form>
        </div>
        {books?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  #Id
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Brand
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map(({ id, name, category, brand, price }) => (
                <TableRow key={id}>
                  <TableCell>
                    {id}
                  </TableCell>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    {category}
                  </TableCell>
                  <TableCell>
                    {brand}
                  </TableCell>
                  <TableCell>
                    {price} $
                  </TableCell>
                  <TableCell>
                    <button style={{ background: "#ffc107", border: "none", color: "white", borderRadius: "5px", marginRight: "10px" }} onClick={() => setBookToUpdate(id)}><EditIcon /></button>
                    <button style={{ background: "#dc3545", border: "none", color: "white", borderRadius: "5px" }} onClick={() => deleteBook(id)}><DeleteIcon /></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No books</p>
        )}
      </div>
      </Container>
    </>
  );
}

export default App;
