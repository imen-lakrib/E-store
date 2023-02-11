import { Container } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../components/admin/Dashboard'
import NavBar from '../../components/admin/NavBar'
import Orders from '../../components/admin/Orders'
import Products from '../../components/admin/Products'

function Admin() {
  return (
    <>
    <NavBar/>
    <Container>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </Container>
    </>
  )
}

export default Admin