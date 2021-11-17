import React from 'react';
import Styles from './researchBar.module.css';

export default function researchBtn() {
  return (
    <div className={Styles.search_container}>
      <input placeholder='キーワード検索' />
      <button>検索する</button>
    </div>
  );
}
