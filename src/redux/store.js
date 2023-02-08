import {configureStore, combineReducers} from "@reduxjs/toolkit"

//import the reducers:
import authReducer from "./slices/authSlice"

//here all the reducers:
const rootReducer = combineReducers({
    auth: authReducer,
})

// the store:
const store = configureStore({
    reducer: rootReducer,

})

export default store