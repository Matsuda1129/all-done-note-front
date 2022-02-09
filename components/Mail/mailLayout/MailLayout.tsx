import React, { useState } from 'react';
import Styles from './MailLayout.module.css';
import { Menubar, CreatePostModal } from '../../Home/layout/parts';
import { ProtectRoute } from '../../Home/protectRouter/protectRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setMailViewFalse, setMailViewTrue } from '../../../redux/mailSlice';
import { RootState } from '../../../redux/store';
import CreateMailModal from './createMailModal/createMailModal';

export default function MailLayout({ children }) {
  const mailView = useSelector((state: RootState) => state.mails.mailView);
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const underline = {
    borderBottom: 'solid 2px #00f',
    color: 'red',
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
              <div className={Styles.flex_container}>
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
      <div className={Styles.item_C}>{children}</div>
      <footer>
        <CreatePostModal />
        <CreateMailModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </footer>
    </ProtectRoute>
  );
}
