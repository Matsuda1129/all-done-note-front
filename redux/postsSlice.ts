import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Post = {
  user_id: number | null;
  content: string | null;
  picture: string | null;
};

export type PostState = {
  post: Post;
};

const initialState: PostState = {
  post: {
    user_id: null,
    content: null,
    picture: null,
  },
};

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.post = action.payload;
    },
    reset(): PostState {
      return initialState;
    },
  },
});

export const { setPosts, reset } = postsSlice.actions;

export default postsSlice.reducer;
