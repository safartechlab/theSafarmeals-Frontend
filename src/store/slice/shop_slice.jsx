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
    loading: false,
    error: null,
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
      state.shoplist = state.shoplist.filter(
        (shop) => shop._id !== action.payload
      );
    },
    setsingleshop: (state, action) => {
      state.singleshop = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setshop,
  setshopupdate,
  setshopdelete,
  setsingleshop,
  setError,
} = ShopSlice.actions;

export default ShopSlice.reducer;

/* ================= API CALLS ================= */

/* GET ALL SHOPS */
export const getshop = () => async (dispatch) => {
  try {
    const res = await axios.get(`${Baseurl}shop/getallshop`);
    dispatch(setshop(res.data?.data || []));
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Failed to fetch shops"));
  }
};

/* ADD SHOP */
export const addshop = (shopData) => async (dispatch) => {
  try {
    await axios.post(`${Baseurl}shop/addshop`, shopData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // ✅ fetch after success
    dispatch(getshop());
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Failed to add shop")
    );
  }
};

/* UPDATE SHOP */
export const updateshop = ({ id, data }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${Baseurl}shop/updateshop/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(setshopupdate(res.data.data));
    dispatch(getshop());
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Failed to update shop")
    );
  }
};

/* DELETE SHOP */
export const deleteshop = (id) => async (dispatch) => {
  try {
    await axios.delete(`${Baseurl}shop/deleteshop/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(setshopdelete(id));
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Failed to delete shop")
    );
  }
};
