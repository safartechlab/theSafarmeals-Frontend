import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "../../Baseurl";

const ItemSlice = createSlice({
  name: "Item",
  initialState: {
    itemlist: [],
    singleitem: null,
    loading: false,
  },
  reducers: {
    setitem: (state, action) => {
      state.itemlist = action.payload;
    },
    setsingleitem: (state, action) => {
      state.singleitem = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default ItemSlice.reducer;
export const { setitem, setsingleitem, setloading } = ItemSlice.actions;

/* ================= ADD ITEM ================= */
export const additem =
  ({ shopId, data }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setloading(true));

      const res = await axios.post(`${Baseurl}item/addItem/${shopId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const currentItems = getState().item.itemlist;
      dispatch(setitem([...currentItems, res.data.data]));
    } finally {
      dispatch(setloading(false));
    }
  };

/* ================= GET ITEMS ================= */
export const getitems = (shopId) => async (dispatch) => {
  try {
    dispatch(setloading(true));

    const res = await axios.get(`${Baseurl}item/getItems/${shopId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(setitem(res.data.data));
  } finally {
    dispatch(setloading(false));
  }
};

/* ================= UPDATE ITEM ================= */
export const updateitem =
  ({ itemId, data }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setloading(true));

      const res = await axios.put(
        `${Baseurl}item/updateItem/${itemId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedItem = res.data.data;
      const items = getState().item.itemlist;

      const updatedList = items.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      );

      dispatch(setitem(updatedList));
    } finally {
      dispatch(setloading(false));
    }
  };

/* ================= DELETE ITEM ================= */
export const deleteitem = (itemId) => async (dispatch, getState) => {
  try {
    dispatch(setloading(true));

    await axios.delete(`${Baseurl}item/deleteItem/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const items = getState().item.itemlist;
    dispatch(setitem(items.filter((item) => item._id !== itemId)));
  } finally {
    dispatch(setloading(false));
  }
};

export const getAllItems = () => async (dispatch) => {
  try {
    dispatch(setloading(true));

    const res = await axios.get(`${Baseurl}item/getAllItems`);

    dispatch(setitem(res.data.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setloading(false));
  }
};
