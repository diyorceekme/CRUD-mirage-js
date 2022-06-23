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
import "../servers/brand-server"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Category = () => {
  const [booksBrand, setBooksBrand] = useState(null)
  const [movieId, setMovieId] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [name, setName] = useState('')

    useEffect(() => {
      fetch('/api/books/brand')
        .then(res => res.json())
        .then(json => setBooksBrand(json.movies))
        .catch(err => console.log(err))
    }, [])

    const creatingBookBrand = async () => {
    try {
      const res = await fetch('/api/books/brand', {
        method: "POST",
        body: JSON.stringify({
          name
        })
      })
      const json = await res.json()
      setBooksBrand([...booksBrand, json.movie])
      setName('')
    } catch (error) {
      console.log(error)
    }
  }

  const updatingBooksBrand = async () => {
    try {
      const res = await fetch(`/api/books/brand/${movieId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name
        })
      })
      const json = await res.json()
      const moviesCopy = [...booksBrand]
      const index = booksBrand.findIndex(m => m.id === movieId)
      moviesCopy[index] = json.movie
      setBooksBrand(moviesCopy)
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
      updatingBooksBrand()
    }    else{
      creatingBookBrand()
    }
  }

  const deleteBooksBrand = async (id) => {
    try {
      await fetch(`/api/books/${id}`, { method: "DELETE" })

      setBooksBrand(booksBrand.filter(m => m.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  const setBooksBrandToUpdate = (id) => {
    const book = booksBrand.find(m => m.id === id)
    setUpdating(true)
    setMovieId(book.id)
    setName(book.name)
  }

  return (
    <>
      <MiniDrawer />
      <Container style={{ marginTop: "150px" }}>
        <h1 style={{ fontWeight: "normal", textAlign: "center", marginY: 3 }}>Books Brands</h1>
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
        {booksBrand?.length > 0 ? (
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
              {booksBrand.map(({ id, name, category, brand, price }) => (
                <TableRow key={id}>
                  <TableCell>
                    {id}
                  </TableCell>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    <button style={{ background: "#ffc107", border: "none", color: "white", borderRadius: "5px", marginRight: "10px" }} onClick={() => setBooksBrandToUpdate(id)}><EditIcon /></button>
                    <button style={{ background: "#dc3545", border: "none", color: "white", borderRadius: "5px" }} onClick={() => deleteBooksBrand(id)}><DeleteIcon /></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No brands</p>
        )}
      </Container>
    </>
  )
}

export default Category