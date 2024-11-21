import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isDelete: false,
  productId: 0,
  type: "create",
  checkboxValue: { isActive: false },
  user: null,
  page: 1,
  limit: 10,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsDelete: (state, action) => {
      state.isDelete = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setCheckboxValue: (state, action) => {
      state.checkboxValue = { isActive: action.payload.isActive };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setIsDelete,
  setProductId,
  setType,
  setCheckboxValue,
  setPage,
  setLimit,
  setUser,
} = appSlice.actions;

export default appSlice.reducer;
