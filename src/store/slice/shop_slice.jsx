import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "../../Baseurl";

const ShopSlice = createSlice({
  name: "Shop",
  initialState: {
    shoplist: [],
    shopupdate: null,
    shopdelete: null,
    singleshop: null,
  },
  reducers: {
    setshop: (state, action) => {
      state.shoplist = action.payload;
    },
    setshopupdate: (state, action) => {
      state.shopupdate = action.payload;
    },
    setshopdelete: (state, action) => {
      state.shopdelete = action.payload;
    },
    setsingleshop: (state, action) => {
      state.singleshop = action.payload;
    },
  },
});

export const { setshop, setshopupdate, setshopdelete, setsingleshop } =
  ShopSlice.actions;

export default ShopSlice.reducer;

export const getshop = () => async (dispatch) => {
  try {
    const res = await axios.get(`${Baseurl}shop/getallshop`);
    dispatch(setshop(res.data?.data || []));
  } catch (error) {
    dispatch(setshop([]));
  }
};

export const addshop = (shopData) => async (dispatch) => {
  try {
    await axios.post(`${Baseurl}shop/addshop`, shopData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // refresh shop list
    dispatch(getshop());
  } catch (error) {
    console.error("Error adding shop", error);
  }
};
