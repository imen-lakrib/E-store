import { Container, Grid } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from '../../components/admin/Dashboard'
import NavBar from '../../components/admin/NavBar'
import Orders from '../../components/admin/Orders'
import Products from '../../components/admin/Products'

// function Admin() {
//   return (
//     <>
//     <NavBar/>
//     </>
//   )
// }

// export default Admin
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { selectUserName } from '../../redux/slices/authSlice'


const drawerWidth = 240;

export default function Admin({ direction }) {
  const { t } = useTranslation()
  const userName= useSelector(selectUserName)

  const sideNav = [
    {
      label: t("dashboard"),
      icon: <InboxIcon />,
      path: "/admin/dashboard"
    },
    {
      label: t("orders"),
      icon: <InboxIcon />,
      path: "/admin/orders"
    },
    {
      label: t("products"),
      icon: <InboxIcon />,
      path: "/admin/products"
    },


  ]
  return (

    <Grid container spacing={2}>
      
      <Grid item xs={3}>
      <Toolbar>
           <Typography>{userName} </Typography>
         </Toolbar>
         <Divider />
         <List>
           {sideNav.map((text, index) => (
             <ListItem key={index} >
               <ListItemButton>
                 <ListItemIcon>{text.icon}</ListItemIcon>
                 <Link to={text.path}>{text.label}</Link>
               </ListItemButton>
            </ListItem>
           ))}
         </List>
      </Grid>
      <Grid item xs={9}>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'gray', p: 3 }}
      >
        <Toolbar />
        <Container>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/products' element={<Products />} />
          </Routes>
        </Container>


      </Box>
      
      </Grid>

    </Grid>

  );
}












































