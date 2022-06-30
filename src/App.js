import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from "./components/Product"
import Category from "./components/Category"
import Brand from "./components/Brand"
import Order from "./components/Order"
import OrderDetails from "./components/OrderDetails"
import OrderCreate from "./components/OrderCreate"
import OrderEdit from "./components/OrderEdit"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/create" element={<OrderCreate />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/update/:id" element={<OrderEdit />} />
        </Routes>
      </Router>
    </>
  )
}