import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // we gonne save it local storage to save the data when we refresh the page
    cartItems: localStorage.getItem('cartItems') ? 
    JSON.parce(localStorage.getItem('cartItems')) : []


}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {}
});

export const {} = cartSlice.actions

export default cartSlice.reducer