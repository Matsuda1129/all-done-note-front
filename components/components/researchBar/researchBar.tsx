import React from 'react';
import Styles from './researchBar.module.css';
import { Button } from '../../utils';

export default function researchBar() {
  return (
    <div className={Styles.search_container}>
      <input placeholder='キーワード検索' />
      <Button>検索する</Button>
    </div>
  );
}
