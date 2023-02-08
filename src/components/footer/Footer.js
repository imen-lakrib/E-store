import {  BottomNavigation, Paper, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
      <BottomNavigation sx={{backgroundColor:"blue"}}>
        <Typography>All Right Reserved For <span style={{color:"white"}} >Imen Lakrib</span>-2023</Typography>
      </BottomNavigation>
      </Paper>
  
  )
}

export default Footer