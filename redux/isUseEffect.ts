import { createSlice } from '@reduxjs/toolkit';

export const isUseEffectSlice = createSlice({
  name: 'isUseEffect',
  initialState: {
    isUseEffect: false,
    finish: false,
  },
  reducers: {
    setTrue: (state) => {
      state.isUseEffect = true;
    },
    setFalse: (state) => {
      state.isUseEffect = false;
    },
  },
});

export const { setTrue, setFalse } = isUseEffectSlice.actions;

export default isUseEffectSlice.reducer;
