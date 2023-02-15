import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../redux/slices/filterSlice';
import { GET_PRICE_RANGE, selectMaxPrice, selectMinPrice } from '../../redux/slices/productSlice';

const ProductFilter = ({products}) => {

  

  // filter by category
  const dispatch = useDispatch()
  const [category, setCategory]=useState("All")
  const allCategories = [
    "All",
    ...new Set(products.map(product => product.data.category))
  ]

  const filterProducts=(cat) =>{
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({products,category:cat}))

  }
 
  // filter by brand
  const [brand, setBrand]= useState("All")

  useEffect(()=>{
    dispatch(FILTER_BY_BRAND({products,brand}))

  },[dispatch, products, brand])

  // filter by price:
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)
  const [price, setPrice]= useState(maxPrice)


  useEffect(()=>{
    dispatch(FILTER_BY_PRICE({products,price}))

  },[dispatch, products, price])

  // clear all filters
  const clearFilters=()=>{
    setCategory("All")
    setBrand("All")
    setPrice(maxPrice)
  }





 
  return (
    <Card sx={{p:2}} >
      <FormLabel id="demo-radio-buttons-group-label">Products Filter</FormLabel>
      <Box py={2} >
      <FormControl fullWidth>
      <FormLabel id="demo-radio-buttons-group-label">Brand:</FormLabel>

        <Select
           value={brand}
           label="sort"
           onChange={(e)=>setBrand(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Nike">Nike</MenuItem>
          <MenuItem value="Dz">DZ</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box py={2} >
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Category:</FormLabel>
      {allCategories.map((cat, index) =>{
        return(<Button color={cat === category ? "secondary": "primary"}  key={index}
        onClick={()=> filterProducts(cat)}
        >
          {cat}
        </Button>)
      })}
    
    
    </FormControl>
    </Box>
      <Box p={2} >
      <FormLabel id="demo-radio-buttons-group-label">Price:</FormLabel>

      <Slider value={price} onChange={(e)=>setPrice(e.target.value)} min={minPrice} max={maxPrice} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
    <Button color='primary' onClick={clearFilters} >Clear Filter</Button>
    </Card>
  )
}

export default ProductFilter