import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/toast_slice'
import searchReducer from './slice/searchbtn'
import authReducer from './slice/AuthSlice'
const store = configureStore({
    reducer:{
        toast:toastReducer,
        search:searchReducer,
        auth : authReducer
    }
})

export default store