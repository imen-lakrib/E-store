import { Container, Grid } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { selectProducts, STORE_PRODUCTS } from '../../redux/slices/productSlice'
import ProductFilter from './ProductFilter'
import ProductsList from './ProductsList'

const Products = () => {
   //custom hook
  const { data, isLoadingProduct } = useFetchCollection("products")
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)

  console.log(products)

  useEffect(() => { 
    dispatch(STORE_PRODUCTS({
      products: data,
    }))

  }, [dispatch, data])
  return (
    <Container sx={{ p:2}}>
      <Grid container spacing={1}>
       
        <Grid item xs={3}>
         <ProductFilter/>
        </Grid>
        <Grid item xs={9}>
          <ProductsList products={products}/>
        </Grid>
        
      </Grid>
    </Container>
  )
}

export default Products