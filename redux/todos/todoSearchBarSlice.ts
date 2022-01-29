import { createSlice } from '@reduxjs/toolkit';
export const todoSearchBarPreparationSlice = createSlice({
  name: 'searchBarTodo',
  initialState: {
    todoSearchBar: {
      genre: '',
      finished: false,
      unfinished: false,
    },
    preparationSearchBar: {
      genre: '',
      finished: false,
      unfinished: false,
    },
    moneySearchBar: {
      genre: '',
      finished: false,
      unfinished: false,
    },
  },
  reducers: {
    setSearchBarTodo: (state, action) => {
      state.todoSearchBar = action.payload;
    },
    setSearchBarTodoFinish: (state, action) => {
      state.todoSearchBar.finished = action.payload;
    },
    setSearchBarTodoUnFinish: (state, action) => {
      state.todoSearchBar.unfinished = action.payload;
    },
    setSearchBarTodoGenre: (state, action) => {
      state.todoSearchBar.genre = action.payload;
    },
    setSearchBarPreparationFinish: (state, action) => {
      state.preparationSearchBar.finished = action.payload;
    },
    setSearchBarPreparationUnFinish: (state, action) => {
      state.preparationSearchBar.unfinished = action.payload;
    },
    setSearchBarPreparationGenre: (state, action) => {
      state.preparationSearchBar.genre = action.payload;
    },
    setSearchBarMoneyFinish: (state, action) => {
      state.moneySearchBar.finished = action.payload;
    },
    setSearchBarMoneyUnFinish: (state, action) => {
      state.moneySearchBar.unfinished = action.payload;
    },
    setSearchBarMoneyGenre: (state, action) => {
      state.moneySearchBar.genre = action.payload;
    },
  },
});

export const {
  setSearchBarTodoFinish,
  setSearchBarTodoUnFinish,
  setSearchBarTodoGenre,
  setSearchBarMoneyFinish,
  setSearchBarMoneyGenre,
  setSearchBarMoneyUnFinish,
  setSearchBarPreparationFinish,
  setSearchBarPreparationGenre,
  setSearchBarPreparationUnFinish,
} = todoSearchBarPreparationSlice.actions;

export default todoSearchBarPreparationSlice.reducer;
