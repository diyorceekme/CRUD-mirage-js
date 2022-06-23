import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from "./components/Product"
import Category from "./components/Category"
import Brand from "./components/Brand"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/brand" element={<Brand />} />
        </Routes>
      </Router>
    </>
  )
}