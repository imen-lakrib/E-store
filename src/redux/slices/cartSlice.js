import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    // we gonne save it in local storage to keep the data when we refresh the page
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [] ,
    // JSON.parce(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,



}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART:(state, action)=>{
      const productIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)
      console.log(action.payload.id)
      if(productIndex >= 0){
        // item already exists in the cart
        // in this case we gonna icrease the cartQuantity of this product
        state.cartItems[productIndex].cartQuantity += 1
        toast.info(`${action.payload.name? action.payload.name: action.payload.data.name} increased by 1`,{
          position: 'bottom-center'
        })

      }else{
        // item does not exists in the cart
        // add item to the cart
        const tempProduct = {...action.payload, cartQuantity: 1}
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.name? action.payload.name: action.payload.data.name} added successfully to cart`,{
          position: 'bottom-center'
        })

      }
      // save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

    },
    DECREASE_CART: (state, action)=>{
      const productIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)

      if(state.cartItems[productIndex].cartQuantity > 1){
        state.cartItems[productIndex].cartQuantity -= 1
      toast.info(`${action.payload.name? action.payload.name: action.payload.data.name} decreased by 1`,{
        position: 'bottom-center'
      })

      }else if(state.cartItems[productIndex].cartQuantity === 1){
        // in this case we delete the product from the cart
        const newCartItem= state.cartItems.filter( item => item.id !== action.payload.id)
        state.cartItems= newCartItem
        toast.info(`${action.payload.name? action.payload.name: action.payload.data.name} deleted from the cart`,{
          position: 'bottom-center'
        })

      }
        // save cart to local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


    },
    DELETE_FROM_CART:(state, action)=>{
      const newCartItem= state.cartItems.filter( item => item.id !== action.payload.id)


      state.cartItems= newCartItem
        toast.info(`${action.payload.name? action.payload.name: action.payload.data.name} deleted from the cart`,{
          position: 'bottom-center'
        })


         // save cart to local storage
         localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      
      

    },
    CLEAR_CART:(state, action)=>{
      state.cartItems = [];

      toast.info("Your cart has been cleared",{
        position: 'bottom-center'
      })


       // save cart to local storage
       localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

    }, CALCULATE_SUB_TOTAL:(state, action)=>{
      const cartItemsAmount = state.cartItems.reduce((acc, curr) => (acc + (curr.price ? curr.price * curr.cartQuantity : curr.data.price * curr.cartQuantity)), 0).toFixed(2)
      state.cartTotalAmount= cartItemsAmount
    }

  }
});

// here we export the actions :
export const {ADD_TO_CART, DECREASE_CART, DELETE_FROM_CART,CLEAR_CART,CALCULATE_SUB_TOTAL} = cartSlice.actions
// here we export the variables (which are the states)
export const selectCartItems = (state)=> state.cart.cartItems
export const selectCartTotalQuantity = (state)=> state.cart.cartTotalQuantity
export const selectCartTotalAmount= (state)=> state.cart.cartTotalAmount

export default cartSlice.reducer