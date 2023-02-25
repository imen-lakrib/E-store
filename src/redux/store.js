import {configureStore, combineReducers} from "@reduxjs/toolkit"

//import the reducers:
import authReducer from "./slices/authSlice"
import productReducer from "./slices/productSlice"
import filterReducer from "./slices/filterSlice"
import cartReducer from "./slices/cartSlice"


//here all the reducers:
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer
})

// the store:
const store = configureStore({
    reducer: rootReducer,

})

export default store