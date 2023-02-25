import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover, Badge, CardMedia, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// ----------------------------------------------------------------------
//redux
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, selectCartTotalCuantity } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { Add, Delete, Remove } from '@mui/icons-material';


// ----------------------------------------------------------------------

export default function CartPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  //

  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalCuantity = useSelector(selectCartTotalCuantity)
  console.log(cartItems.length)

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 24,
          height: 24,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon color="action" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            width: 320,
            height: ' 100%',
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75} sx={{ textAlign: "center" }}>
          <h1>Shopping Cart</h1>
          {!cartItems.length ? (
            <div>Your cart is currently empty!
              <br />

              <Link to="/#products">&larr; complete shopping ..</Link>
            </div>
          ) : 
          <div>
            {cartItems.map(item => {
            return (
              <Card sx={{ display: 'flex', m:"2px" }}>
                <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", p: 2 }}>
                  <img style={{ width: '10%' }} src={item.imgURL ? item.imgURL : item.data.imgURL} />
                  <Box>
                    <Typography component="div" variant="h6" wrap>
                      {`${item.name ? item.name : item.data.name}`.substring(0, 80).concat("..")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton ><Remove sx={{fontSize:20, border:"gray 1px solid"}} /></IconButton>
                      <p >1</p>
                      <IconButton><Add sx={{fontSize:20, border:"gray 1px solid"}}/></IconButton>
                    </Box>

                  </Box>

                  <Box>
                  <IconButton><Delete sx={{fontSize:20, color:'red'}}/></IconButton>

                    
                    <p>022$</p>
                  </Box>

                  



                </Box>
              </Card>
            )
          })}
          <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center",p:1}}>
                      <Typography variant="h6">Total: 0124 $</Typography>
                      <Button>Checkout</Button>
                  </Box>
          </div>
          }

        </Stack>
      </Popover>
    </>
  );
}