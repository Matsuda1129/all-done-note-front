import { createSlice } from '@reduxjs/toolkit';

export const modalPostSlice = createSlice({
  name: 'modalPost',
  initialState: {
    modalPost: false,
  },
  reducers: {
    setTrue: (state) => {
      state.modalPost = true;
    },
    setModalFalse: (state) => {
      state.modalPost = false;
    },
  },
});

export const { setTrue, setModalFalse } = modalPostSlice.actions;

export default modalPostSlice.reducer;
