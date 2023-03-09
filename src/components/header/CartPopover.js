import { useState , useEffect} from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, IconButton, Popover, Badge, Card, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Add, Delete, Remove } from '@mui/icons-material';
import Fab from '@mui/material/Fab';

// ----------------------------------------------------------------------
//redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, DECREASE_CART, CLEAR_CART, DELETE_FROM_CART,CALCULATE_SUB_TOTAL, selectCartItems, selectCartTotalAmount } from '../../redux/slices/cartSlice';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  // const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  console.log(cartItems.length)

  const decreaseCart = (item) => {
    dispatch(DECREASE_CART(item))

  }
  const increaseCart = (item) => {
    dispatch(ADD_TO_CART(item))

  }

  const deleteFromCart = (item) => {
    dispatch(DELETE_FROM_CART(item))

  }

  const clearCart=()=>{
    dispatch(CLEAR_CART())

  }
  // 
  useEffect(()=>{
    dispatch(CALCULATE_SUB_TOTAL())

  },[dispatch, cartItems])

  // check if the user is loggedin or not for the checkout opperation:

  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const checkOut =()=>{
    if(isLoggedIn){
      navigate('/checkout')
    }
    else navigate('/login')
  
    
  }
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

              <Button onClick={() => handleClose()}>&larr; complete shopping ..
              </Button>
            </div>
          ) :
            <div>
              {cartItems.map(item => {
                return (
                  <Card sx={{ display: 'flex', m: "2px" }}>
                    <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", p: 2 }}>
                      <img alt='name' style={{ width: '10%' }} src={item.imgURL ? item.imgURL : item.data.imgURL} />
                      <Box>
                        <Typography component="div" variant="h6" wrap>
                          {`${item.name ? item.name : item.data.name}`.substring(0, 80).concat("..")}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton onClick={() => decreaseCart(item)} ><Remove sx={{ fontSize: 20, border: "gray 1px solid" }} /></IconButton>
                          <p >{item.cartQuantity}</p>
                          <IconButton onClick={() => increaseCart(item)}><Add sx={{ fontSize: 20, border: "gray 1px solid" }} /></IconButton>
                        </Box>

                      </Box>

                      <Box>
                        <IconButton onClick={() => deleteFromCart(item)}><Delete sx={{ fontSize: 20, color: 'red' }} /></IconButton>


                        <p>{item.price ? (item.price * item.cartQuantity).toFixed(2) : (item.data.price * item.cartQuantity).toFixed(2)}$</p>
                      </Box>





                    </Box>
                  </Card>
                )
              })}
              <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", p: 1 }}>

                <Typography variant="h6">Total: {cartTotalAmount} $</Typography>
                <Button onClick={checkOut}>Checkout</Button>
              </Box>

              <Fab  variant="extended" size="small" onClick={()=> clearCart()} color="error" aria-label="add">
                Clear Cart
              </Fab>
            </div>
          }



        </Stack>
      </Popover>
    </>
  );
}