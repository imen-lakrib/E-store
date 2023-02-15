import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { FILTER_BY_CATEGORY } from '../../redux/slices/filterSlice';

const ProductFilter = ({products}) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // 
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
  return (
    <Card sx={{p:2}} >
      <FormLabel id="demo-radio-buttons-group-label">Products Filter</FormLabel>
      <Box py={2} >
      <FormControl fullWidth>
      <FormLabel id="demo-radio-buttons-group-label">Brand:</FormLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box py={2} >
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Category:</FormLabel>
      {allCategories.map((cat, index) =>{
        return(<Button sx={{backgroundColor:cat === category ? "red": null}} key={index}
        onClick={()=> filterProducts(cat)}
        >
          {cat}
        </Button>)
      })}
    
    
    </FormControl>
    </Box>
      <Box py={2} >
      <FormLabel id="demo-radio-buttons-group-label">Price:</FormLabel>

      <Slider defaultValue={1000} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
    <Button>Clear Filter</Button>
    </Card>
  )
}

export default ProductFilter