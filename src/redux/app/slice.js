import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isDelete: false,
  productId: 0,
  type: "create",
  checkboxValue: { isActive: false },
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
  },
});

export const {
  setIsOpen,
  setIsDelete,
  setProductId,
  setType,
  setCheckboxValue,
} = appSlice.actions;

export default appSlice.reducer;
