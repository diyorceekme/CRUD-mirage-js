import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MiniDrawer from './Dashboard'
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddLocationIcon from '@mui/icons-material/AddLocation';

const OrderDetails = () => {
  const [orderById, setOrderById] = useState()
  const { id } = useParams()
  console.log(orderById)

  useEffect(() => {
    fetch(`/api/order/${id}`)
      .then(res => res.json())
      .then(json => setOrderById(json.orders))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <MiniDrawer />
      <Container style={{ marginTop: "150px" }}>
        <h1>Customer</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PersonIcon /> <p style={{ marginLeft: "10px" }}>{orderById?.name}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PhoneIcon /> <p style={{ marginLeft: "10px" }}>{orderById?.phone}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PaymentsIcon /> <p style={{ marginLeft: "10px" }}>{orderById?.transaction}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AddLocationIcon /> <p style={{ marginLeft: "10px" }}>{orderById?.state}</p>
          </div>
        </div>
      <Table style={{ marginTop: "30px" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "blue !important" }}>
              Product name
            </TableCell>
            <TableCell style={{ color: "blue !important" }}>
              Product price
            </TableCell>
            <TableCell style={{ color: "blue !important" }}>
              Product quantity
            </TableCell>
            <TableCell style={{ color: "blue !important" }}>
              Total price
            </TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            <TableRow>
            <TableCell>
                {orderById?.productName}
            </TableCell>
            <TableCell>
              {orderById?.productPrice} so'm
            </TableCell>
            <TableCell>
              {orderById?.quantity}
            </TableCell>
            <TableCell>
              {orderById?.productPrice * orderById?.quantity} so'm
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </Container>
    </>
  )
}

export default OrderDetails