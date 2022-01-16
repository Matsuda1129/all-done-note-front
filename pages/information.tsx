import React from 'react';
import { Header, ResearchBar } from '../components/Home';
import { ProtectRoute } from '../components/Home/protectRouter/protectRouter';
import Styles from '../styles/information.module.css';

export default function Information() {
  return (
    <ProtectRoute>
      <header>
        <Header />
      </header>
      <main>
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
      </main>
    </ProtectRoute>
  );
}
