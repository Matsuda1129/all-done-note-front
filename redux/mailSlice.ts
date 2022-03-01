import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({
  name: 'mailView',
  initialState: {
    mailView: false,
  },
  reducers: {
    setMailViewTrue: (state) => {
      state.mailView = true;
    },
    setMailViewFalse: (state) => {
      state.mailView = false;
    },
  },
});

export const { setMailViewFalse, setMailViewTrue } = mailSlice.actions;

export default mailSlice.reducer;
