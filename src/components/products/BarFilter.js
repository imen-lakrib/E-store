import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Search from '../Search';
export default function BarFilter({filtredProducts, setGrid, search, setSearch, sort, setSort}) {
  return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
    >
      <IconButton sx={{display:{xs:"none",md:"flex" }}}   onClick={()=> setGrid(true)}>
        <AppsRoundedIcon />
      </IconButton>
      <IconButton sx={{display:{xs:"none",md:"flex" }}}   onClick={()=> setGrid(false)}>
        <MenuRoundedIcon />
      </IconButton>
      <Typography sx={{display:{xs:"none",md:"flex" }}} ><strong>{filtredProducts.length}</strong> products </Typography> 
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
     <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Sord By</InputLabel>
      <Select
        value={sort}
        label="sort"
        onChange={(e)=>setSort(e.target.value)}
      >
       
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="lowest-price">Lowest Price</MenuItem>
        <MenuItem value="highest-price">Highest Price</MenuItem>
        <MenuItem value="a-z">A-Z</MenuItem>
        <MenuItem value="z-a">Z-A</MenuItem>
      </Select>
    </FormControl>
     
    </Paper>
  );
}