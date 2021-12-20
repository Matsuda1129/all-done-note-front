import React, { useState } from 'react';
import Flash from './flash';
import Menubar from './menubar';
import Styles from './header.module.css';

export default function Header() {

  return (
    <div className={Styles.position_fixed}>
      <div className={Styles.bodyBackground}>
        <div className={Styles.grid_container}>
          <div className={Styles.item_A}>
            <div className={Styles.menubar_position}>
              <Menubar/>
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
