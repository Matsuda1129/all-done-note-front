import { createSlice } from '@reduxjs/toolkit';
export const openDataSlice = createSlice({
  name: 'openData',
  initialState: {
    open: true,
  },
  reducers: {
    setOpenDataTrue: (state) => {
      state.open = true;
    },
    setOpenDataFalse: (state) => {
      state.open = false;
    },
    changeOpenData: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpenDataTrue, setOpenDataFalse, changeOpenData} =
  openDataSlice.actions;

export default openDataSlice.reducer;
