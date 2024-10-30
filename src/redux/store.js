// src/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./login/api";
import { productApi } from "./product/api";
import appReducer from "./app/slice";

const rootReducer = combineReducers({
  app: appReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

export default store;
