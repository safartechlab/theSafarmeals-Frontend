import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        auth:false,
        user:{}
    },
    reducers:{
        initiallogin : (state , action) => {
            state.auth = true,
            state.user = action.payload
        },
        clearauth:(state) =>{
            state.auth=false,
            state.user = {}
        }
    }
})

export const {initiallogin,clearauth} = authSlice.actions
export default authSlice.reducer