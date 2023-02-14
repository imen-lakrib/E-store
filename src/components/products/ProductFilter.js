import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Typography } from '@mui/material'
import React from 'react'

const ProductFilter = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Card sx={{p:2}}>
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
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
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