import React, { useEffect, useState } from 'react';
import Styles from './researchBar.module.css';
import { Button } from '../../utils';
import { useForm } from 'react-hook-form';
import { findAllPost } from '../../../repositories/posts';

type FormValuse = {
  searchword: string;
};

export default function ResearchBar(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    await props.setCheckedSearch(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={Styles.search_container}>
        <input
          {...register('searchword', {})}
          type='text'
          placeholder='キーワード検索'
          onChange={(e) => props.setSearchWord(e.target.value)}
          value={props.searchWord}
        />
        <Button>検索する</Button>
      </div>
    </form>
  );
}
