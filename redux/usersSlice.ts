import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number | null;
  name: string | null;
  email: string | null;
  alive: boolean;
  introduction: string | null;
  will: string | null;
  movie: string | null;
  icon: string | null;
  picture: string[] | null;
  gender: string | null;
  birthday: string | null;
  job: string | null;
  savings: number | null;
  alone: boolean | null;
  isMarried: boolean | null;
  isParents: boolean | null;
  isSpouseParents: boolean | null;
  isChild: boolean | null;
  isChildren2: boolean | null;
  isChildren3: boolean | null;
  isOthers: boolean | null;
  goalMoeny1: number | null;
  goalMoney2: number | null;
  allPercent: number | null;
  moenyPercent: number | null;
  preparationPercent: number | null;
  todoPercent: number | null;
  openData: boolean | null;
  openDataAfterDie: boolean | null;
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
    icon: null,
    picture: [],
    gender: null,
    birthday: null,
    job: null,
    savings: null,
    isMarried: null,
    isParents: null,
    isSpouseParents: null,
    isChild: null,
    isChildren2: null,
    isChildren3: null,
    isOthers: null,
    alone: null,
    goalMoeny1: null,
    goalMoney2: null,
    allPercent: null,
    moenyPercent: null,
    preparationPercent: null,
    todoPercent: null,
    openData: null,
    openDataAfterDie: null,
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
    setAlone: (state, action) => {
      state.user.alone = action.payload;
    },
    reset(): UserState {
      return initialState;
    },
  },
});

export const { updateUser, setUsers, reset, setAlone } = usersSlice.actions;

export default usersSlice.reducer;
