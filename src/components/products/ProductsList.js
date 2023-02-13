import { Grid3x3, ListAlt } from '@mui/icons-material'
import { Box, Grid, IconButton, Typography, Container } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import ProductItem from "./ProductItem"

import BarFilter from './BarFilter';
const ProductsList = ({ products }) => {
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState("")
  return (

    <Box>


      <BarFilter products={products} setGrid={setGrid} search={search} setSearch={setSearch} />

      <Grid container spacing={1} id="products" sx={{my:1}}>
      {products.length === 0 ? (<Typography>there is no product to show</Typography>) : 
      (products.map(product => {
        return (
          <Grid item xs={grid? 4: 12}><ProductItem product={product} grid={grid}/></Grid>

        )
      }))}
        




      </Grid>
    </Box>

  )
}

export default ProductsList