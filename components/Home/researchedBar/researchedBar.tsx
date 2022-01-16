import React, { useEffect, useState } from 'react';
import Styles from './researchedBar.module.css';
import { useForm } from 'react-hook-form';
import { fetchSearchedPosts } from '../../../repositories/posts';

type FormValuse = {
  searchword: string;
};

export default function ResearchedBar(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  
  const onSubmit = async () => {
    const listData = await fetchSearchedPosts(1, props.searchWord);
    await props.setSearchHasMore(true);
    await props.setSearchPage(2);
    await props.setSearchedPosts(listData);
  };

  return (
    <div className={Styles.search_container}>
      <button
        className={Styles.backButton}
        onClick={() => props.setCheckedSearch(false)}
      >
        ←
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('searchword', {})}
          className={Styles.search_input}
          type='text'
          placeholder='キーワード検索'
          onChange={(e) => props.setSearchWord(e.target.value)}
          value={props.searchWord}
        />
      </form>
    </div>
  );
}
