import { createSlice } from '@reduxjs/toolkit';

export const loginUserCheck = createSlice({
  name: 'loginUserCheck',
  initialState: {
    loginUserCheck: false,
  },
  reducers: {
    changeLoignUserCheck: (state, action) => {
      state.loginUserCheck = action.payload;
    },
  },
});

export const { changeLoignUserCheck } = loginUserCheck.actions;

export default loginUserCheck.reducer;
