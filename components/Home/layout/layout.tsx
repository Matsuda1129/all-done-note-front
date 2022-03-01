import React from 'react';
import Styles from './layout.module.css';
import { Flash, Menubar, CreatePostModal } from './parts';
import { ProtectRoute } from '../protectRouter/protectRouter';
import { slide as Menu } from 'react-burger-menu';
import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
  signatureVersion: 'v4',
});
const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '15px',
    top: '15px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

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
      <div className={Styles.item_B}>
        <div className={Styles.burger_menu}>
          <Menu
            styles={styles}
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            width={'250px'}
          >
            <Menubar />
          </Menu>
        </div>
        {children}
      </div>
      <div className={Styles.z_index2}>
        <CreatePostModal />
      </div>
    </ProtectRoute>
  );
}
