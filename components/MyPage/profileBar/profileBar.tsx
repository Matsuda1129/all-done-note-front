import React from 'react';
import { FollowButton } from '../../parts';
import { Button } from '../../utils';
import Styles from './profileBar.module.css';

export default function ProfileBar({
  checkLogin,
  userId,
  showProfileModal,
}) {
  if (!checkLogin) {
    return (
      <div>
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
          <Button className={Styles.will_btn}>遺書</Button>
        </div>
        <div className={Styles.iconMovie}>
          <Button className={Styles.will_btn}>動画</Button>
        </div>
      </div>
    );
  }
}
