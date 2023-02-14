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
  }
});

export const {FILTER_BY_SEARCH, } = filterSlice.actions

export const selectFilterProducts = (state)=> state.filter.filtredProducts

export default filterSlice.reducer