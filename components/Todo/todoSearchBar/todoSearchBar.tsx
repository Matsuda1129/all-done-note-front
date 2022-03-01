import { MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Styles from './todoSearchBar2.module.css';

export default function TodoSearchBar({
  genres,
  setSearchBarFinish,
  setSearchBarUnFinish,
  setSearchGenre,
  searchBarState,
}) {
  const dispatch = useDispatch();

  const changeCheckFinished = async () => {
    if (searchBarState.finished === true) {
      dispatch(setSearchBarFinish(false));
    } else {
      dispatch(setSearchBarFinish(true));
      dispatch(setSearchBarUnFinish(false));
    }
  };

  const changeCheckUnFinished = async () => {
    if (searchBarState.unfinished === true) {
      dispatch(setSearchBarUnFinish(false));
    } else {
      dispatch(setSearchBarUnFinish(true));
      dispatch(setSearchBarFinish(false));
    }
  };

  return (
    <form className={Styles.center}>
      <Select
        className={Styles.margin}
        value={searchBarState.genre}
        onChange={(e) => dispatch(setSearchGenre(e.target.value))}
      >
        <MenuItem value={undefined}>選択なし</MenuItem>
        {genres.map((genre) => {
          return (
            <MenuItem value={genre} key={genre}>
              {genre}
            </MenuItem>
          );
        })}
      </Select>
      <label className={Styles.margin}>
        <input
          type='checkbox'
          checked={searchBarState.finished}
          onChange={changeCheckFinished}
        />
        完了
      </label>
      <label className={Styles.margin}>
        <input
          checked={searchBarState.unfinished}
          type='checkbox'
          onChange={changeCheckUnFinished}
        />
        未完了
      </label>
    </form>
  );
}
