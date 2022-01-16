import { Select, MenuItem } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import Styles from './userSearchBar.module.css';

export default function UserSearchBar(props) {
  type FormValuse = {
    searchword: string;
    gender: string;
    age: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('searchword', {})}
          className={Styles.search_input}
          type='text'
          placeholder='キーワード検索'
          onChange={(e) => props.setSearchWord(e.target.value)}
          value={props.searchWord}
        />
        <label>性別</label>
        <Select
          {...register('gender')}
          className={Styles.flex_container_item３}
          onChange={(e) => props.setGender(e.target.value)}
        >
          <MenuItem value=''>未選択</MenuItem>
          <MenuItem value='man'>男性</MenuItem>
          <MenuItem value='woman'>女性</MenuItem>
          <MenuItem value='other'>その他</MenuItem>
        </Select>
        <label>年代</label>
        <Select
          {...register('age')}
          className={Styles.flex_container_item３}
          onChange={(e) => props.setAge(e.target.value)}
        >
          <MenuItem value=''>未選択</MenuItem>
          <MenuItem value={10}>10代</MenuItem>
          <MenuItem value={20}>20代</MenuItem>
          <MenuItem value={30}>30代</MenuItem>
          <MenuItem value={40}>40代</MenuItem>
          <MenuItem value={50}>50代</MenuItem>
          <MenuItem value={60}>60代</MenuItem>
          <MenuItem value={70}>70代</MenuItem>
          <MenuItem value={80}>80代</MenuItem>
          <MenuItem value={90}>90代</MenuItem>
          <MenuItem value={100}>100代</MenuItem>
        </Select>
      </form>
    </div>
  );
}
