import React from 'react';
import Styles from './researchBar.module.css';
import Button from './utils/button';

export default function researchBtn() {
  return (
    <div className={Styles.search_container}>
      <input placeholder='キーワード検索' />
      <Button>検索する</Button>
    </div>
  );
}
