import { Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MiniDrawer from './Dashboard'

const OrderCreate = () => {
  const [product, setProduct] = useState(null)
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [transaction, setTransaction] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const navigate = useNavigate()

  const creatingBook = async () => {
    try {
      const res = await fetch('/api/order', {
        method: "POST",
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
      setProduct([...product, json.orders])
      setProductName('')
      setProductPrice('')
      setTransaction('')
      setQuantity('')
      setName('')
      setPhone('')
      setState('')
      if(res.status === 201){
        navigate("/order")
      }else{
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const submitForm = async (event) => {
    event.preventDefault();
    creatingBook()
  }

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => setProduct(json.products))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <MiniDrawer />
      <Container style={{ marginTop: "150px" }}>
        <div>
          <h3>Create order</h3>
          <div>
            <form onSubmit={submitForm}>
              <div style={{ display: "flex" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select product</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productName}
                    placeholder="Select product"
                    onChange={e => setProductName(e.target.value)}
                  >
                    {product?.map(prod => (
                      <MenuItem value={prod?.name}>{prod?.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Price</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productPrice}
                    placeholder="Select product"
                    onChange={e => setProductPrice(e.target.value)}
                  >
                    {product?.map(prod => (
                      <MenuItem value={prod?.price}>{prod?.price} so'm</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Pay type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={transaction}
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
                <TextField type="number" placeholder='Quantity...' value={quantity} onChange={e => setQuantity(e.target.value)} />
                <TextField placeholder='Your name...' value={name} onChange={e => setName(e.target.value)} />
                <TextField placeholder='Your phone number...' value={phone} onChange={e => setPhone(e.target.value)} />
                <TextField placeholder='Your state...' value={state} onChange={e => setState(e.target.value)} />
              </div>
              <div style={{ marginTop: "30px" }}>
                <button type="submit" style={{ background: "green", border: "none", color: "white", width: "100px", height: "40px", borderRadius: "5px" }}>Create</button>
              </div>
            </form> 
          </div>
        </div>
      </Container>
    </>
  )
}

export default OrderCreate