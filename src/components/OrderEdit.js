import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MiniDrawer from './Dashboard'

const OrderEdit = () => {
  const [editOrderById, setEditOrderById] = useState(null)
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [transaction, setTransaction] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [productId, setProductId] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [productPrice, setProductPrice] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  const updatingBook = async () => {
    try {
      const res = await fetch(`/api/order/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          productName,
          productPrice,
          transaction,
          quantity,
          name,
          phone,
          state
        })
      })
      console.log(res)
      const json = await res.json()
      console.log(json)
      const productCopy = [...editOrderById]
      console.log(productCopy)
      const index = editOrderById.findIndex(m => m.id === productId)
      productCopy[index] = json.editOrderById
      setEditOrderById(productCopy)
      setProductName('')
      setProductPrice('')
      setTransaction('')
      setQuantity('')
      setName('')
      setPhone('')
      setState('')
      setUpdating(false)
      setProductId(null)
      if (res.status === 200) {
        navigate("/order")
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  }

    const submitForm = async (event) => {
    event.preventDefault();
    updatingBook()
  }

  const setOrderToUpdate = (id) => {
    const order = editOrderById.find(m => m.id === id)
    setUpdating(true)
    setProductId(order.id)
    setProductName(order.producName)
    setProductName(order.producPrice)
    setProductName(order.transaction)
    setQuantity(order.quantity)
    setName(order.name)
    setPhone(order.phone)
    setState(order.state)
  }

    useEffect(() => {
      fetch(`/api/order/${id}`)
        .then(res => res.json())
        .then(json => setEditOrderById(json.orders))
        .catch(err => console.log(err))
    }, [])

  return (
    <>
        <MiniDrawer />
        <Container style={{ marginTop: "150px" }}>
            <div>
              <h3>Edit order</h3>
              <div>
                <form onSubmit={submitForm}>
                  <div style={{ display: "flex" }}>
                    <TextField fullWidth placeholder={editOrderById?.productName} value={productName} onChange={e => setProductName(e.target.value)} />
                    <TextField fullWidth placeholder={editOrderById?.productPrice} value={productPrice} onChange={e => setProductPrice(e.target.value)} /> 
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Pay type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={editOrderById?.transaction}
                        placeholder="Select product"
                        onChange={e => setTransaction(e.target.value)}
                      >
                        <MenuItem value={"Naqd"}>Naqd</MenuItem>
                        <MenuItem value={"Plastik kartadan"}>Plastik kartadan</MenuItem>
                        <MenuItem value={"Bo'lib to'lash"}>Bo'lib to'lash</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                    <TextField type="number" placeholder={editOrderById?.quantity} value={quantity} onChange={e => setQuantity(e.target.value)} />
                    <TextField placeholder={editOrderById?.name} value={name} onChange={e => setName(e.target.value)} />
                    <TextField placeholder={editOrderById?.phone} value={phone} onChange={e => setPhone(e.target.value)} />
                    <TextField placeholder={editOrderById?.state} value={state} onChange={e => setState(e.target.value)} />
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <button type="submit" style={{ background: "green", border: "none", color: "white", width: "100px", height: "40px", borderRadius: "5px" }} onClick={() => setOrderToUpdate(id)}>Edit</button>
                  </div>
                </form> 
              </div>
            </div>
        </Container>
    </>
  )
}

export default OrderEdit