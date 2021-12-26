import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const modalPostSlice = createSlice({
  name: 'modalPost',
  initialState: {
    modalPost: false,
  },
  reducers: {
    setTrue:(state) => {
      state.modalPost = true;
    },
    setFalse:(state) => {
      state.modalPost = false;
    },
  },
});

export const { setTrue, setFalse } = modalPostSlice.actions;

export default modalPostSlice.reducer;
