import { createSlice } from "@reduxjs/toolkit";

const Searchbarbtn = createSlice ({
    name:'searchbar',
    initialState:{
        searchbarbtn : true
    },
    reducers:{
        setsearch : (state) =>{
            state.searchbarbtn=! state.searchbarbtn
        }
    }
})

export const {setsearch} = Searchbarbtn.actions
export default Searchbarbtn.reducer