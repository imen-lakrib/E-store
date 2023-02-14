import { Grid3x3, ListAlt } from '@mui/icons-material'
import { Box, Grid, IconButton, Typography, Container } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import ProductItem from "./ProductItem"
//redux:
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, selectFilterProducts } from '../../redux/slices/filterSlice'



import BarFilter from './BarFilter';
import { useEffect } from 'react'
const ProductsList = ({ products }) => {
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState("")

  //
  const filtredProducts= useSelector(selectFilterProducts)
  console.log(filtredProducts)

  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
    console.log(products)

  },[dispatch, products, search])
  return (

    <Box>


      <BarFilter filtredProducts={filtredProducts} setGrid={setGrid} search={search} setSearch={setSearch} />

      <Grid container spacing={1} id="products" sx={{my:1}}>
      {products.length === 0 ? (<Typography>there is no product to show</Typography>) : 
      (filtredProducts.map(product => {
        return (
          <Grid item xs={grid? 4: 12}><ProductItem  product={product} grid={grid}/></Grid>

        )
      }))}
        




      </Grid>
    </Box>

  )
}

export default ProductsList