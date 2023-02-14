import {configureStore, combineReducers} from "@reduxjs/toolkit"

//import the reducers:
import authReducer from "./slices/authSlice"
import productReducer from "./slices/productSlice"
import filterReducer from "./slices/filterSlice"


//here all the reducers:
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
})

// the store:
const store = configureStore({
    reducer: rootReducer,

})

export default store