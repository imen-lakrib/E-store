import { Card, Container, Grid, IconButton } from '@mui/material'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from '../../components/admin/Dashboard'
import NavBar from '../../components/admin/NavBar'
import Orders from '../../components/admin/Orders'
import Products from '../../components/admin/Products'
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
import { useState } from 'react'
import { ArrowBack, ArrowForward, CloseFullscreen, OpenInBrowser } from '@mui/icons-material'
import BarChartIcon from '@mui/icons-material/BarChart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


export default function Admin({ direction }) {
  const { t } = useTranslation()
  const userName = useSelector(selectUserName)


  const [open, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen(!open)
  }


  const sideNav = [
    {
      label: t("dashboard"),
      icon: <BarChartIcon />,
      path: "/admin/dashboard"
    },
    {
      label: t("orders"),
      icon: <AddShoppingCartIcon />,
      path: "/admin/orders"
    },
    {
      label: t("products"),
      icon: <CategoryIcon />,
      path: "/admin/products"
    },


  ]
  return (

    <Grid container spacing={1} sx={{ p: 1 }}>

      {/* just for mobile */}
      <Grid item xs={12} sx={{ backgroundColor: "white", my: 1 , display:{xs:"block", md:"none"}}}>

        
        <Card sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
          {sideNav.map((text, index) => (
            <Box key={index}  >
              <NavLink to={text.path} >
                 {text.icon}
              </NavLink>
            </Box>
          ))}
        </Card>

      </Grid>


      {/* normal  */}
      <Grid item md={open ? 2.5 : 1} xs={0}  sx={{ backgroundColor: "white", height: "100vh", mt: 1,  display:{xs:"none", md:"block"} }}>

        <Toolbar sx={{ justifyContent: "flex-end" }} >
          <IconButton onClick={toggleMenu}>
            {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}


          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {sideNav.map((text, index) => (
            <ListItem key={index} sx={{ justifyContent: "start" }} >

              <NavLink to={text.path} >
                <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                 <IconButton>{text.icon}</IconButton>   
                  <Typography sx={{ display: open ? "block" : "none"}}>  {text.label}</Typography>
                  </Box>

              </NavLink>

            </ListItem>
          ))}
        </List>

      </Grid>
      <Grid item xs={12} md={open ? 9.5 : 11}>

        <Box
          component="main"


        >
          <>
            <Routes>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/products' element={<Products />} />
            </Routes>
          </>


        </Box>

      </Grid>

    </Grid>

  );
}












































