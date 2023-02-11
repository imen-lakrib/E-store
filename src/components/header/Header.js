import { AppBar,Grid, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import StoreIcon from '@mui/icons-material/Store';
import MyAccount from './MyAccount';
import LanguagePopover from './LanguagePopover';
import CartPopover from './CartPopover';
import MobilePopover from './MobilePopover';
import { useTranslation } from 'react-i18next';


function Header({local, setDirection}) {
  const { t } = useTranslation()

  // sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
  // xs={6} md={8}

  const logo = (
    <Link to="/">
      <MenuItem  >
        <StoreIcon />{t("estore")}
      </MenuItem>
  
    </Link>
  )

  return (
    <AppBar sx={{ backgroundColor: "white", p: 1 }} position="static">
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={6} sm={3}>
          {logo}
        </Grid>
        <Grid item xs={0} sm={6} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center", justifyContent: "space-evenly" }}>

          <NavLink to="/">{t("home")}</NavLink>
          <NavLink to="/shop">{t("shop")}</NavLink>
          <NavLink to="cart">{t("cart")}</NavLink>
          <NavLink to="/contact">{t("contact")}</NavLink>

        </Grid>

        <Grid item xs={4} sm={3} sx={{ display: "flex", alignItems: "center" }}>
          <LanguagePopover local={local} setDirection={setDirection} />
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