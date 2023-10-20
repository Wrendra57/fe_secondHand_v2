import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "order",
  storage,
};

const initialState = {
  listProduct: {},
};
export const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addListProduct: (state, { payload }) => {
      state.listProduct = payload;
    },
    addProduct: (state, { payload }) => {
      state.product = payload;
    },
  },
});
export const { addListProduct, addProduct } = slice.actions;

export const orderPersistReducer = persistReducer(
  persistConfig,
  slice.reducer
);
