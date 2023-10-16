import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "product",
  storage,
};

const initialState = {
  listProduct: {},
};
export const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addListProduct: (state, { payload }) => {
      state.listProduct = payload;
    },
  },
});
export const { addListProduct } = slice.actions;

export const productPersistReducer = persistReducer(
  persistConfig,
  slice.reducer
);
