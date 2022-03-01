import { Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { informationRepository } from '../../../repositories';
import Styles from './informationSearchBar.module.css';

export default function InformationSearchBar({
  setSearchTitle,
  setSearchGenre,
  searchTitle,
}) {
  type FormValuse = {
    title: string;
    genre: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async () => {};

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const res: any = await informationRepository.findGenre();
        await setGenres(res);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={Styles.flex_container_searchBar}
      >
        <input
          {...register('title', {})}
          className={Styles.search_input}
          type='text'
          placeholder='キーワード検索'
          onChange={(e) => setSearchTitle(e.target.value)}
          value={searchTitle}
        />
        <label>
          ジャンル
          <Select
            {...register('genre')}
            className={Styles.search_genre}
            type='text'
            placeholder='キーワード検索'
            onChange={(e) => setSearchGenre(e.target.value)}
          >
            <MenuItem defaultValue=''>未選択</MenuItem>
            {genres.map((genre) => {
              return (
                <MenuItem value={genre} key={genre}>
                  {genre}
                </MenuItem>
              );
            })}
          </Select>
        </label>
      </form>
    </div>
  );
}
