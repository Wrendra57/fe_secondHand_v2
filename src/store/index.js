import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import authApi from "./apis/authentication";
import productApi from "./apis/product";
// import chatApi from "./apis/chat";
// import transactionApi from "./apis/transaction";
// import usersApi from "./apis/users";
// import chatApi from "./apis/chat";
// import kosApi from "./apis/kos";
// import transaksiApi from "./apis/transaksi";
// import bannerApi from "./apis/banner";

import { authPersistReducer } from "./slices/authSlice";
import { productPersistReducer } from "./slices/productSlice";
// import { chatPersistReducer } from "./slices/chatSlice";
// import { userPersistReducer } from "./slices/userSlice";
// import { chatPersistReducer } from "./slices/chatSlice";
// import { kosPersistReducer } from "./slices/kosSlice";
// import { transaksiPersistReducer } from "./slices/transaksiSlice";

// import { decorReducer } from "./slices/decorSlice";
// import { alamatReducer } from "./slices/alamatSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    // [chatApi.reducerPath]: chatApi.reducer,
    // [usersApi.reducerPath]: usersApi.reducer,
    // [kosApi.reducerPath]: kosApi.reducer,
    // [bannerApi.reducerPath]: bannerApi.reducer,
    // [transactionApi.reducerPath]: transactionApi.reducer,
    // [transaksiApi.reducerPath]: transaksiApi.reducer,
    // [chatApi.reducerPath]: chatApi.reducer,
    auth: authPersistReducer,
    product: productPersistReducer,
    // chat: chatPersistReducer,
    // 	user: userPersistReducer,
    // 	kos: kosPersistReducer,
    // 	transaksi: transaksiPersistReducer,
    // 	decor: decorReducer,
    // 	alamat: alamatReducer,
    // chat: chatPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      productApi.middleware,
      // chatApi.middleware,
      //   usersApi.middleware,
      //   kosApi.middleware,
      //   bannerApi.middleware,
      //   transactionApi.middleware,
      //   transaksiApi.middleware,
      //   chatApi.middleware,
    ]),
});

export const persistor = persistStore(store);
