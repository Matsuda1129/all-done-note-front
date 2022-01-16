import React from 'react';
import { ResearchBar } from '../components/Home';
import { Flash, Menubar } from '../components/parts';
import Styles from '../styles/test.module.css';

export default function Test() {
  return (
    <div className={Styles.bodyBackground}>
      <div className={Styles.flex_container}>
        <div className={Styles.position_fixed}>
          <Menubar />
        </div>
        <div className={Styles.grid_container}>
          <div className={Styles.item_A}>
            <h1 className={Styles.title}>情報検索</h1>
            <ResearchBar />
          </div>
          <div className={Styles.item_B}>
            <div className={Styles.information}>
              <a href=''>タイトル</a>
              <div>内容</div>
            </div>
          </div>
        </div>
        <Flash></Flash>
      </div>
    </div>
  );
}
