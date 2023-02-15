import {  BottomNavigation, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  return (
    
      <Grid xs={12} sx={{ width:"100%",position: 'relative', bottom: 0, left: 0, right: 0 }} >
      <BottomNavigation sx={{backgroundColor:"gray", alignItems:"center" }}>
        <Typography sx={{fontSize: { xs: '10px',sm:"14px", md: '16px' }}}> {t("rights")}<span style={{color:"white"}} >Imen Lakrib</span>-2023</Typography>
      </BottomNavigation>
      </Grid>
  
  )
}

export default Footer

