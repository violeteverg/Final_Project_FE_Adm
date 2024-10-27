// src/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./login/api";
import appReducer from "./app/slice";

const rootReducer = combineReducers({
  app: appReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
