import { Container, Grid } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { selectFilterProducts } from '../../redux/slices/filterSlice'
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
    <Container sx={{ p:2}} >

      {/* mobile */}
      {/* <Grid container spacing={1}>
       
        <Grid item xs={3} sm={0}  sx={{display:{ xs:"none",sm:"none", md:"grid"}}} >
         <ProductFilter/>
        </Grid>
        <Grid item xs={9} sm={12} >
          <ProductsList  products={products}/>
        </Grid>
        
      </Grid> */}


{/* normal */}
      <Grid container spacing={1} >
       
        <Grid item xs={0} sm={0} md={3} sx={{display:{xs:"none", md:"block"}}} >
         <ProductFilter/>
        </Grid>
        <Grid item xs={12} sm={12} md={9} >
          <ProductsList  products={products}/>
        </Grid>
        
      </Grid>
    </Container>
  )
}

export default Products