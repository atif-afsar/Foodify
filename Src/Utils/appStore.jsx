import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"

const appStore = configureStore({
    reducer : { // One big Reducer 
        cart : cartReducer, // the child Reducer
    }
})

export default appStore;