import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // we gonne save it in local storage to keep the data when we refresh the page
    cartItems: localStorage.getItem('cartItems') ? 
        JSON.parce(localStorage.getItem('cartItems')) : [],
    cartTotalCuantity: 0,
    cartTotalAmount: 0,



}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART:(state, action)=>{
      console.log(action.payload)

    }
  }
});

// here we export the actions :
export const {ADD_TO_CART} = cartSlice.actions
// here we export the variables (which are the states)
export const selectCartItems = (state)=> state.cart.cartItems
export const selectCartTotalCuantity = (state)=> state.cart.cartTotalCuantity
export const selectCartTotalAmount= (state)=> state.cart.cartTotalAmount

export default cartSlice.reducer