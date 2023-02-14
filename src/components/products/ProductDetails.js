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
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Add, ArrowBack, PlusOne, Remove } from '@mui/icons-material';
const ProductDetails = () => {

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

  console.log(product)



  return (
    <>
      <Container sx={{ p: 4 }}>
        <Grid container spacing={4}>
        <Grid item xs={12}>
          <Link to="/#products">
          <IconButton>
            <ArrowBack/> Back to shop
          </IconButton></Link>
        </Grid>
          <Grid item xs={5}>
            <Card >
              <CardMedia
                component="img"
                height="350"
                image={product?.imgURL}
              />            </Card>
          </Grid>
          <Grid item xs={7}>
            <Card >
              <CardContent> <Typography component="div" variant="h4">
              {product?.name}
              </Typography>
              <Typography  variant="body2">{product?.description}</Typography>

              </CardContent>
             
              <CardContent>

                <Typography gutterBottom variant='h6'>Brand: <Chip size="small" label={product?.brand} /></Typography>
                <Typography gutterBottom variant='h6'>Category: <Chip size="small" label={product?.category} /></Typography>
                <Typography gutterBottom variant='h4'>${product?.price}.00</Typography>

              </CardContent>

              <CardActions disableSpacing>
                <Box sx={{display:"flex", alignItems:"center"}}>
                  <IconButton ><Remove/></IconButton>
                  <Typography variant="h6">1</Typography>
                  <IconButton><Add/></IconButton>
                </Box>
                <br/>
                <Button>Add To Cart</Button>
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
              <Typography  variant="body2">Description: {product?.description}</Typography>

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