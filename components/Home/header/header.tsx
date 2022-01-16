import React from 'react';
import Styles from './header.module.css';
import { Flash, Menubar } from '../../parts';

export default function Header() {
  return (
    <div className={Styles.position_fixed}>
      <div className={Styles.bodyBackground}>
        <div className={Styles.grid_container}>
          <div className={Styles.item_A}>
            <div className={Styles.menubar_position}>
              <Menubar />
            </div>
          </div>
          <div className={Styles.item_C}>
            <Flash />
          </div>
        </div>
      </div>
    </div>
  );
}
