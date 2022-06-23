import React, { useEffect, useState } from 'react'
import MiniDrawer from './Dashboard'
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField
} from "@mui/material";
import "../servers/category-server"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Category = () => {
  const [booksCategory, setBooksCategory] = useState(null)
  const [movieId, setMovieId] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [name, setName] = useState('')
  useEffect(() => {
    fetch('/api/books/category')
      .then(res => res.json())
      .then(json => setBooksCategory(json.movies))
      .catch(err => console.log(err))
  }, [])
  const creatingMovie = async () => {
  try {
    const res = await fetch('/api/books/category', {
      method: "POST",
      body: JSON.stringify({
        name
      })
    })
    const json = await res.json()
    setBooksCategory([...booksCategory, json.movie])
    setName('')
  } catch (error) {
    console.log(error)
  }
  }

  const updatingBooksCategory = async () => {
    try {
      const res = await fetch(`/api/books/category/${movieId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name
        })
      })
      const json = await res.json()
      const moviesCopy = [...booksCategory]
      const index = booksCategory.findIndex(m => m.id === movieId)
      moviesCopy[index] = json.movie
      setBooksCategory(moviesCopy)
      setName('')
      setUpdating(false)
      setMovieId(null)
    } catch (error) {
      console.log(error)
    }
  }

  const submitForm = async (event) => {
    event.preventDefault();

    if(updating){
      updatingBooksCategory()
    }    else{
      creatingMovie()
    }
  }

  const deleteBooksCategory = async (id) => {
    try {
      await fetch(`/api/books/category/${id}`, { method: "DELETE" })

      setBooksCategory(booksCategory.filter(m => m.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  const setBooksCategoryToUpdate = (id) => {
    const book = booksCategory.find(m => m.id === id)
    setUpdating(true)
    setMovieId(book.id)
    setName(book.name)
  }

  return (
    <>
      <MiniDrawer />
      <Container style={{ marginTop: "150px" }}>
        <h1 style={{ fontWeight: "normal", textAlign: "center", marginY: 3 }}>Books Categories</h1>
        <div style={{ marginY: 4 }}>
          <form onSubmit={submitForm}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <TextField type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: "20px" }} />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <button type="submit" style={{ backgroundColor: "#28a745", border: "none", color: "white", width: "55px", height: "55px", borderRadius: "5px" }}>
                  {updating ? <EditIcon /> : <AddIcon />  }
                </button>
              </div>
            </div>
          </form>
        </div>
        {booksCategory?.length > 0 ? (
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booksCategory.map(({ id, name }) => (
                <TableRow key={id}>
                  <TableCell>
                    {id}
                  </TableCell>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    <button style={{ background: "#ffc107", border: "none", color: "white", borderRadius: "5px", marginRight: "10px" }} onClick={() => setBooksCategoryToUpdate(id)}><EditIcon /></button>
                    <button style={{ background: "#dc3545", border: "none", color: "white", borderRadius: "5px" }} onClick={() => deleteBooksCategory(id)}><DeleteIcon /></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No categories</p>
        )}
      </Container>
    </>
  )
}

export default Category