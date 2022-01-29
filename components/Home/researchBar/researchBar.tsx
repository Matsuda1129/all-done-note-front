import React from 'react';
import Styles from './researchBar.module.css';
import { useForm } from 'react-hook-form';
import { Button } from '../../utils';

type FormValuse = {
  searchword: string;
};

export default function ResearchBar({
  searchWord,
  setSearchWord,
  setCheckedSearch,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    await setCheckedSearch(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={Styles.container}>
        <input
          className={Styles.input}
          {...register('searchword', {})}
          type='text'
          placeholder='キーワード検索'
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
        />
        <Button>検索する</Button>
      </div>
    </form>
  );
}
