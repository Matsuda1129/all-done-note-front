import { createSlice } from '@reduxjs/toolkit';
export const openDataSlice = createSlice({
  name: 'openData',
  initialState: {
      open: false,
  },
  reducers: {
    changeOpenData: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { changeOpenData } = openDataSlice.actions;

export default openDataSlice.reducer;
