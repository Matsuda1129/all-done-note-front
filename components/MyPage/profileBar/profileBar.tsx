import React from 'react';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import { FollowButton } from '../../parts';
import { Button } from '../../utils';
import Styles from './profileBar.module.css';

export default function ProfileBar({
  checkLogin,
  userId,
  showProfileModal,
  setWillModal,
}) {
  const openWillModal = async () => {
    await setWillModal(true);
    await backfaceFixed(true);
  };

  if (!checkLogin) {
    return (
      <div className={Styles.flex_container}>
        <FollowButton userId={userId} />
      </div>
    );
  } else {
    return (
      <div className={Styles.flex_container}>
        <Button onClick={showProfileModal} className={Styles.profile_btn}>
          プロフィール編集
        </Button>
        <div className={Styles.iconWill}>
          <Button className={Styles.will_btn} onClick={openWillModal}>
            遺書
          </Button>
        </div>
        <div className={Styles.iconMovie}>
          <Button className={Styles.will_btn}>動画</Button>
        </div>
      </div>
    );
  }
}
