import { Button, Card, Chip, Container, Grid, IconButton, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Add, ArrowBack, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, DECREASE_CART, selectCartItems } from '../../redux/slices/cartSlice'


const ProductDetails = () => {

  const dispatch = useDispatch()

  // tab :
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    getProduct()
  }, [id])

  const getProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const object = {
          id: id,
          ...docSnap.data()
        }
        setProduct(object)
      }



    } catch (error) {
      toast.error(error.message)

    }
  }


  // add to cart : 
  const addToCart = (product) => {

    dispatch(ADD_TO_CART(product))

  }


  // find single product 

  const cartItems = useSelector(selectCartItems)
  const prodactCart = cartItems.find((item)=> item.id ===id )
  
  

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product))

  }
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product))

  }


  const isAdded = cartItems.findIndex((item)=>{
    return item.id === id
  })





  return (
    <>
      <Container sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Link to="/#products">
              <IconButton>
                <ArrowBack /> Back to shop
              </IconButton></Link>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ width: "100%" }}
                cover
                image={product?.imgURL}
              />            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card >
              <CardContent> <Typography component="div" variant="h4">
                {product?.name}
              </Typography>
                <Typography variant="body2">
                  {`${product?.description}`.substring(0, 180).concat("..")}
                </Typography>

              </CardContent>

              <CardContent>

                <Typography gutterBottom variant='h6'>Brand: <Chip size="small" label={product?.brand} /></Typography>
                <Typography gutterBottom variant='h6'>Category: <Chip size="small" label={product?.category} /></Typography>
                <Typography gutterBottom color='secondary' variant='h4'>${product?.price}.00</Typography>

              </CardContent>

              <CardActions disableSpacing>
                
                {isAdded<0 ? null :(<Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => decreaseCart(product)} ><Remove sx={{ fontSize: 20, border: "gray 1px solid" }} /></IconButton>
                  <p >{prodactCart.cartQuantity}</p>
                  <IconButton onClick={() => increaseCart(product)}><Add sx={{ fontSize: 20, border: "gray 1px solid" }} /></IconButton>
                </Box>)}
                <br />
                <Button onClick={() => addToCart(product)} color='secondary'>Add To Cart</Button>
              </CardActions>





            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card><Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Description" value="1" />
                    <Tab label="Review" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <CardContent>
                    <Typography variant="body2">Description: {product?.description}</Typography>

                  </CardContent>


                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>

              </TabContext>
            </Box></Card>
          </Grid>

        </Grid>
      </Container>
    </>
  )
}

export default ProductDetails