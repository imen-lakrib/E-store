import {  BottomNavigation, Paper, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  return (
    
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
      <BottomNavigation sx={{backgroundColor:"blue"}}>
        <Typography> {t("rights")}<span style={{color:"white"}} >Imen Lakrib</span>-2023</Typography>
      </BottomNavigation>
      </Paper>
  
  )
}

export default Footer

