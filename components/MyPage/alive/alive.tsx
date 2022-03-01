import React, { useState } from 'react';
import Styles from './alive.module.css';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function Alive({ checkLogin, setAliveModal }) {
  const loginUser: any = useSelector((state: RootState) => state.users.user);

  if (!checkLogin) {
    return null;
  } else {
    return (
      <div>
        <button
          onClick={() => {
            setAliveModal(true), backfaceFixed(true);
          }}
          className={Styles.alive}
        >
          {loginUser.alive ? 'alive' : 'dead'}
        </button>
      </div>
    );
  }
}
