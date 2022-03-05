import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Styles from './loading.module.css';
export default function Loading() {
  const loadingState = useSelector((state: RootState) => state.loading.loading);

  return (
    <>
      {loadingState ? (
        <ReactLoading
          className={Styles.center}
          type='spinningBubbles'
          height={'15%'}
          width={'15%'}
          color={'skyblue'}
        />
      ) : null}
    </>
  );
}
