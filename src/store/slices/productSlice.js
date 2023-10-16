import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "product",
  storage,
};

const initialState = {
  listProduct: {},
  product: {},
};
export const slice = createSlice({
  name: "product",
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

export const productPersistReducer = persistReducer(
  persistConfig,
  slice.reducer
);
