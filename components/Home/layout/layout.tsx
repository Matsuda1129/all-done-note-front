import React from 'react';
import Styles from './layout.module.css';
import { Flash, Menubar, CreatePostModal } from './parts';
import { ProtectRoute } from '../protectRouter/protectRouter';

export default function Layout({ children }) {
  return (
    <ProtectRoute>
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
      <div className={Styles.item_B}>{children}</div>
      <footer>
        <CreatePostModal />
      </footer>
    </ProtectRoute>
  );
}
