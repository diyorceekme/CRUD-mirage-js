import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MiniDrawer from './Dashboard'
import DetailsIcon from "../public/detailsicon.823a24e3b9095333d4730cc4d28fa407.svg"
import Delete from "../public/Без названия.png"
import Edit from "../public/Без названия (1).png"

const Order = () => {
  const [order, setOrder] = useState(null)
  const [product, setProduct] = useState(null)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [productId, setProductId] = useState(null)
  const [updating, setUpdating] = useState(false)
  

    const creatingBook = async () => {
    try {
      const res = await fetch('/api/order', {
        method: "POST",
        body: JSON.stringify({
          productName,
          productPrice,
          quantity,
          name,
          phone,
          state
        })
      })
      const json = await res.json()
      setProduct([...product, json.orders])
      setProductName('')
      setProductPrice('')
      setQuantity('')
      setName('')
      setPhone('')
      setState('')
    } catch (error) {
      console.log(error)
    }
  }

  const updatingBook = async () => {
    try {
      const res = await fetch(`/api/order/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({
          productName,
          productPrice,
          quantity,
          name,
          phone,
          state
        })
      })
      const json = await res.json()
      const productCopy = [...order]
      const index = order.findIndex(m => m.id === productId)
      productCopy[index] = json.order
      setOrder(productCopy)
      setProductName('')
      setQuantity('')
      setName('')
      setPhone('')
      setState('')
      setUpdating(false)
      setProductId(null)
    } catch (error) {
      console.log(error)
    }
  }

  const submitForm = async (event) => {
    event.preventDefault();

    if(updating){
      updatingBook()
    } else{
      creatingBook()
    }
  }

  const deleteOrder = async (id) => {
    try {
      await fetch(`/api/order/${id}`, { method: "DELETE" })

      setOrder(order.filter(m => m.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  const setOrderToUpdate = (id) => {
    const order = product.find(m => m.id === id)
    setUpdating(true)
    setProductId(order.id)
    setProductName(order.product_name)
    setQuantity(order.quantity)
    setName(order.name)
    setPhone(order.phone)
    setState(order.state)
  }

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => setProduct(json.products))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch('/api/order')
      .then(res => res.json())
      .then(json => setOrder(json.orders))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <MiniDrawer />
      <Container maxWidth="xl" style={{ marginTop: "150px" }}>
      <div className="App" style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}> 
            <h1 style={{ fontWeight: "normal", textAlign: "center", marginY: 3 }}>Order</h1>
            <Link to="/order/create">
              <button style={{ width: "100px", height: "40px", backgroundColor: "#065374", color: "white", border: "none", borderRadius: "5px" }}>Create Order</button>
            </Link>
          </div>
        {order?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  #Id
                </TableCell>
                <TableCell>
                  User's Name
                </TableCell>
                <TableCell>
                  Phone number
                </TableCell>
                <TableCell>
                  State
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
              {
                order.map((order) => (
                  <TableRow>
                  <TableCell key={order?.id}>
                    {order?.id}
                  </TableCell>
                  <TableCell>
                    {order?.name}
                  </TableCell>
                  <TableCell>
                    {order?.phone}
                  </TableCell>
                  <TableCell>
                    {order?.state}
                  </TableCell>
                  <TableCell>
                    <Link to={`/order/${order.id}`}>
                      <img src={DetailsIcon} alt="" />
                    </Link>
                    <Link to={`/order/update/${order.id}`}>
                      <img src={Edit} style={{ marginLeft: "10px" }} onClick={() => setOrderToUpdate(order.id)} alt="" />
                    </Link>
                    <img src={Delete} style={{ marginLeft: "10px" }} onClick={() => deleteOrder(order.id)} alt="" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No orders</p>
        )}
      </div>
      </Container>
    </>
  )
}

export default Order