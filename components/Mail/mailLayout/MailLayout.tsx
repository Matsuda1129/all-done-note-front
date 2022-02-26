import React, { useState } from 'react';
import Styles from './MailLayout.module.css';
import { Menubar, CreatePostModal } from '../../Home/layout/parts';
import { ProtectRoute } from '../../Home/protectRouter/protectRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setMailViewFalse, setMailViewTrue } from '../../../redux/mailSlice';
import { RootState } from '../../../redux/store';
import CreateMailModal from './createMailModal/createMailModal';
import { slide as Menu } from 'react-burger-menu';

export default function MailLayout({ children }) {
  const mailView = useSelector((state: RootState) => state.mails.mailView);
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const underline = {
    borderBottom: 'solid 2px #00f',
    color: 'red',
  };

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
            <div className={Styles.item_B}>
              <div className={Styles.flex_containerB}>
                <div className={Styles.iconMail}>メッセージ</div>
                <button
                  className={`${Styles.button} ${Styles.iconPuls}`}
                  onClick={() => setIsOpen(true)}
                >
                  作成
                </button>
                <div style={mailView === false ? underline : null}>
                  <button
                    className={`${Styles.button}  ${Styles.iconPost}`}
                    onClick={() => dispatch(setMailViewFalse())}
                  >
                    受信トレイ
                  </button>
                </div>
                <div
                  className={`${Styles.button} ${Styles.iconKamihikouki}`}
                  style={mailView === true ? underline : null}
                >
                  <button
                    className={Styles.button}
                    onClick={() => dispatch(setMailViewTrue())}
                  >
                    送信済み
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.item_C}>
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
      <footer>
        <CreatePostModal />
        <CreateMailModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </footer>
    </ProtectRoute>
  );
}
