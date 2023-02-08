import { AppBar, Avatar, Badge, Button, Chip, Grid, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import MyAccount from './MyAccount';
import LanguagePopover from './LanguagePopover';
import CartPopover from './CartPopover';
import MenuIcon from '@mui/icons-material/Menu';
import MobilePopover from './MobilePopover';
const logo = (
  <Link to="/">
    <MenuItem  >
      <StoreIcon />E-store
    </MenuItem>

  </Link>
)
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
  // xs={6} md={8}
  return (
    <AppBar sx={{ backgroundColor: "white", p: 1 }} position="static">
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={6} sm={3}>
          {logo}
        </Grid>
        <Grid item xs={0} sm={6} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center", justifyContent: "space-evenly" }}>

          <NavLink to="/">
            {({ isActive }) => (
              <Typography  sx={{color: isActive? 'red': 'blue'}}> Home</Typography>
            )}
            Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="cart">cart</NavLink>
          <NavLink to="/contact">ContactUs</NavLink>

        </Grid>

        <Grid item xs={4} sm={3} sx={{ display: "flex", alignItems: "center" }}>
          <LanguagePopover />
          <CartPopover />
          <MyAccount />


        </Grid>
        <Grid item xs={2} sm={0} sx={{ color: "blue", display: { xs: 'block', sm: 'none' } }}>
          <MobilePopover />


        </Grid>


      </Grid>
    </AppBar>
  )
}

export default Header