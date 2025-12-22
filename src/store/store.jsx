import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/toast_slice'
import searchReducer from './slice/searchbtn'
import authReducer from './slice/AuthSlice'
import shopReducer from './slice/shop_slice'
import itemReducer from './slice/item_slice'
const store = configureStore({
    reducer:{
        toast:toastReducer,
        search:searchReducer,
        auth : authReducer,
        shop : shopReducer,
        item : itemReducer,
    }
})

export default store