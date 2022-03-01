import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { todosRepository } from '../../../repositories';
import TodoLists from './parts/todoLists';
import Styles from './todoGenreList.module.css';

export default function TodoGenreList({
  userId,
  genre,
  group,
  searchBarState,
}) {
  const [lists, setList] = useState([]);
  const [genres, setGenres] = useState('');
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );

  useEffect(() => {
    const firstFetch = async () => {
      try {
        if (searchBarState.finished) {
          const finishedListData: any = await todosRepository.findFinishedLists(
            userId,
            group,
            genre,
            true
          );

          await setList(finishedListData);
        } else if (searchBarState.unfinished) {
          const finishedListData: any = await todosRepository.findFinishedLists(
            userId,
            group,
            genre,
            false
          );

          await setList(finishedListData);
        } else {
          const listData: any = await todosRepository.findLists(
            userId,
            group,
            genre
          );
          await setList(listData);
        }

        if (searchBarState.genre === undefined) {
          await setGenres(genre);
        } else {
          await setGenres(searchBarState.genre);
        }
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [
    isUseEffect,
    genre,
    group,
    searchBarState.finished,
    searchBarState.genre,
    searchBarState.unfinished,
    userId,
  ]);

  if (lists.length === 0 || genres !== genre) {
    return null;
  } else {
    return (
      <div>
        <div className={Styles.genre_title}>{genre}</div>
        {lists.map((list) => {
          return <TodoLists key={list.id} list={list} userId={userId} />;
        })}
      </div>
    );
  }
}
