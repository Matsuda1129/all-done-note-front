import React from 'react';
import Styles from './researchedBar.module.css';
import { useForm } from 'react-hook-form';

type FormValuse = {
  searchword: string;
};

export default function ResearchedBar({
  searchWord,
  setSearchWord,
  setCheckedSearch,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  return (
    <div className={Styles.container}>
      <button
        className={Styles.backButton}
        onClick={() => setCheckedSearch(false)}
      >
        ←
      </button>
      <input
        {...register('searchword', {})}
        className={Styles.input}
        type='text'
        placeholder='キーワード検索'
        onChange={(e) => setSearchWord(e.target.value)}
        value={searchWord}
      />
    </div>
  );
}
