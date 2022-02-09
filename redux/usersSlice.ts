import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number | null;
  name: string | null;
  email: string | null;
  alive: true;
  introduction: string | null;
  will: string | null;
  movie: string | null;
  picture: string | null;
  gender: string | null;
  birthday: string | null;
  job: string | null;
  savings: number | null;
  // family: string[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type UserState = {
  user: User;
};

export type UpdateUserPayload = User;

const initialState: UserState = {
  user: {
    id: null,
    name: null,
    email: null,
    introduction: null,
    alive: true,
    will: null,
    movie: null,
    picture: null,
    gender: null,
    birthday: null,
    job: null,
    savings: null,
    // family: null,
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

export const { updateUser, setUsers, reset } = usersSlice.actions;

export default usersSlice.reducer;
