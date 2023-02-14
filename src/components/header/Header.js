import { AppBar, Box, Grid, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import StoreIcon from '@mui/icons-material/Store';
import MyAccount from './MyAccount';
import LanguagePopover from './LanguagePopover';
import CartPopover from './CartPopover';
import MobilePopover from './MobilePopover';
import { useTranslation } from 'react-i18next';


function Header({ local, setDirection }) {
  const { t } = useTranslation()

  // sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
  // xs={6} md={8}

  const logo = (
    <Link to="/">
      <MenuItem  >
        <StoreIcon />
        <Typography sx={{display: { xs: 'none', sm: 'flex' }}}> {t("estore")}</Typography>
       
      </MenuItem>

    </Link>
  )

  return (
    <AppBar sx={{ backgroundColor: "white", p: 2, zIndex: 5 }} position="static">
      <Grid container spacing={2} sx={{ alignItems: "center" }}>

        {/* mobile menu */}

        <Grid xs={12} sx={{ display: { xs: 'flex', md: 'none' }, alignItems: "center", justifyContent: "space-around", pt: 2 }}>
          <Grid sx={{ color: "blue" }}>
            <MobilePopover />


          </Grid>
          <Grid >
            {logo}
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <LanguagePopover local={local} setDirection={setDirection} />
            <CartPopover />
            <MyAccount />


          </Grid>
      </Grid>


      {/* normal menu */}
     <Grid xs={12} sx={{display:{ xs: 'none', md: 'flex' }, alignItems: "center", justifyContent: "space-around" , pt: 2 }}>
     <Grid >
        {logo}
      </Grid>

      <Grid sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center", justifyContent: "center" }}>

        <Box sx={{mx:2}}><NavLink  to="/">{t("home")}</NavLink></Box>
        <Box sx={{mx:2}}> <NavLink to="/#products">{t("shop")}</NavLink></Box>

        <Box sx={{mx:2}}> <NavLink to="cart">{t("cart")}</NavLink></Box>

        <Box sx={{mx:2}}> <NavLink to="/contact">{t("contact")}</NavLink></Box>

       
       
       
      </Grid>

      <Grid  sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
        <LanguagePopover local={local} setDirection={setDirection} />
        <CartPopover />
        <MyAccount />


      </Grid>

     </Grid>

























    </Grid>
    </AppBar >
  )
}

export default Header