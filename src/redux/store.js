import {configureStore, combineReducers} from "@reduxjs/toolkit"

//import the reducers:
import authReducer from "./slices/authSlice"
import productReducer from "./slices/productSlice"

//here all the reducers:
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
})

// the store:
const store = configureStore({
    reducer: rootReducer,

})

export default store