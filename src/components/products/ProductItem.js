
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Add, Remove } from '@mui/icons-material';
import { Button, Chip, Dialog, DialogContent, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, DECREASE_CART, selectCartItems } from '../../redux/slices/cartSlice'



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductItem({ product, grid }) {

  const dispatch = useDispatch()



  // Quiq view:

  const [openQuiqView, setOpenQuiqView] = useState(false);
  const handleClickOpenQuiqView = () => {
    setOpenQuiqView(true);
  };

  // const handleSubmitQuiqView= (e) => {

  //   handleCloseQuiqView()

  // };
  const handleCloseQuiqView = () => {
    setOpenQuiqView(false);
  };

  // add to cart : 
  const addToCart = (product) => {
    console.log(product)
    dispatch(ADD_TO_CART(product))

  }

  // to do : need review

  const cartItems = useSelector(selectCartItems)
  // const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  const prodactCart = cartItems.find((item)=> item.id === cartItems.id )
console.log(prodactCart)

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product))

  }
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product))

  }








  return (
    <>
      {grid ?
        <Card sx={{ maxWidth: 300 }}>

          <Link to={`/product-details/${product.id}`}><CardMedia

            component="img"
            height="150"
            image={product.data.imgURL}
            alt={product.data.name}
          /></Link>
          <CardContent sx={{ py: 1 }}>
            <Typography variant="h6" >
              {`${product.data.name}`.substring(0, 40).concat("..")}
            </Typography>
            <Typography variant="h6" color="secondary">
              {`${product.data.price}`}.00$
            </Typography>
          </CardContent>
          <CardActions disableSpacing >
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={() => handleClickOpenQuiqView()}>
              <VisibilityIcon />
            </IconButton>

            <ExpandMore
            ><Button onClick={() => addToCart(product)} color='secondary'>Add to cart</Button>

            </ExpandMore>
          </CardActions>
        </Card> :

        (
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" wrap>
                  {`${product.data.name}`.substring(0, 80).concat("..")}
                </Typography>
                <Typography sx={{ width: "500px" }} flexWrap variant="subtitle1" color="text.secondary" component="div">
                  {`${product.data.description}`.substring(0, 120).concat("..")}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, py: 1 }}>

                <CardActions disableSpacing >
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share"
                    onClick={() => handleClickOpenQuiqView()}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <ExpandMore
                  ><Button onClick={() => addToCart(product)} color='primary'>Add to cart</Button>

                  </ExpandMore>
                </CardActions>

              </Box>
            </Box>
            <Link to={`/product-details/${product.id}`}><CardMedia

              component="img"
              sx={{ width: "100%" }}
              image={product.data.imgURL}
              alt={product.data.name}
            /></Link>
          </Card>
        )
      }

      {/*  Quiq View model*/}
      <Dialog
        fullWidth
        maxWidth="md"
        open={openQuiqView}
        onClose={handleCloseQuiqView}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogContent sx={{ padding: "10px 20px" }}>
          <Grid Grid container spacing={2}>
            <Grid item xs={12} sm={6} >
              <Card sx={{ width: { xs: "250px", sm: "200px", md: "300px" } }}>
                <img alt={product.data.name} style={{ width: "100%" }} src={product.data.imgURL} />

              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card >
                <CardContent> <Typography component="div" variant="h4">
                  {product.data.name}
                </Typography>
                  <Typography variant="body2">
                    {`${product.data.description}`.substring(0, 200).concat("..")}
                  </Typography>

                </CardContent>

                <CardContent>

                  <Typography gutterBottom variant='h6'>Brand: <Chip size="small" label={product.data.brand} /></Typography>
                  <Typography gutterBottom variant='h6'>Category: <Chip size="small" label={product.data.category} /></Typography>
                  <Typography gutterBottom color='secondary' variant='h4'>${product.data.price}.00</Typography>

                </CardContent>

                <CardActions disableSpacing>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => decreaseCart(product)} ><Remove sx={{ fontSize: 20, border: "gray 1px solid" }} /></IconButton>
                    <p >{product.cartQuantity}</p>
                    <IconButton onClick={() => increaseCart(product)}><Add sx={{ fontSize: 20, border: "gray 1px solid" }} /></IconButton>
                  </Box>
                  <br />
                  <Button onClick={() => addToCart(product)} color='secondary'>Add To Cart</Button>
                </CardActions>

              </Card>
            </Grid>
          </Grid>



        </DialogContent>
      </Dialog>
      {/*Quiq View */}
    </>

  );
}