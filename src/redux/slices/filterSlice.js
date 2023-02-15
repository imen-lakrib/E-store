import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filtredProducts :[]

}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action)=>{
        const {products, search} = action.payload
        const tempProducts = products.filter((product)=> 
        product.data.name.toLowerCase().includes(search.toLowerCase()) || 
        product.data.category.toLowerCase().includes(search.toLowerCase)
        )
        state.filtredProducts = tempProducts
        
    },
    SORT_PRODUCTS: (state, action)=>{
      const {products, sort} = action.payload
      let tempProducts = []
      if (sort === "latest"){
        tempProducts = products
      }
      if (sort === "lowest-price"){
        tempProducts= products.slice().sort((a,b)=>{
          return a.data.price - b.data.price
        })
      }
      if (sort === "highest-price"){
        tempProducts= products.slice().sort((a,b)=>{
          return b.data.price - a.data.price
        })
      }
      if (sort === "a-z"){
        tempProducts= products.slice().sort((a,b)=>{
          return a.data.name.localeCompare(b.data.name)
        })
      }
      if (sort === "z-a"){
        tempProducts= products.slice().sort((a,b)=>{
          return b.data.name.localeCompare(a.data.name)
        })
      }


      state.filtredProducts = tempProducts
      
  },
  FILTER_BY_CATEGORY: (state, action)=>{
    const {products, category}= action.payload
    let tempProducts = []
    if(category === "All"){
      tempProducts = products
    } else {
      tempProducts = products.filter(product => product.data.category === category)
    }
    state.filtredProducts = tempProducts 


  },
  FILTER_BY_BRAND: (state, action)=>{
    const {products, brand} = action.payload
    let tempProducts = []
    if (brand === "All"){
      tempProducts = products
    } else {
      tempProducts = products.filter(product => product.data.brand === brand)

    }
   
   
   
   


    state.filtredProducts = tempProducts
    
},
  }
});

export const {FILTER_BY_SEARCH,SORT_PRODUCTS, FILTER_BY_CATEGORY , FILTER_BY_BRAND} = filterSlice.actions

export const selectFilterProducts = (state)=> state.filter.filtredProducts

export default filterSlice.reducer