import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  name: string | null;
  email: string | null;
  alive: true;
  will: string | null;
  movie: string | null;
  sex: string | null;
  birthday: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type UserState = {
  user: User;
};

export type UpdateUserPayload = User;

const initialState: UserState = {
  user: {
    name: null,
    email: null,
    alive: true,
    will: null,
    movie: null,
    sex: null,
    birthday: null,
    createdAt: null,
    updatedAt: null,
  },
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UpdateUserPayload>) {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.user = action.payload;
    },
    reset(): UserState {
      return initialState;
    },
  },
});

export const getUsers = () => {
  return async (dispatch) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    dispatch(setUsers(data));
  };
};

export const { updateUser, setUsers, reset } = usersSlice.actions;

export default usersSlice.reducer;
