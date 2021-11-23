import Image from 'next/image';
import Styles from './menubar.module.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { reset } from '../redux/usersSlice';
import { useSelector } from 'react-redux';
import { UserState } from '../redux/usersSlice';
import Cooike from 'js-cookie';
import { useState } from 'react';


export default function Menubar({show, setShow}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: { users: UserState }) => state.users.user);
  const logout = async () => {
    await dispatch(reset());
    await fetch(`${process.env.baseURL}/user/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    Cooike.remove('jwt');
    Cooike.remove('signedIn');
    router.push('/firstPage');
  };


  return (
    <div className={Styles.container}>
      <div>
        <Image
          priority
          src='/images/treeIcon.jpg'
          height={50}
          width={50}
          alt={'アイコン'}
        />
        {/* <div>{user.name}</div> */}
      </div>
      <a href='' className={Styles.iconHome}>ホーム</a>
      <a href='' className={Styles.iconMail}>メッセージ</a>
      <a href='' className={Styles.iconCheck}>目標リスト</a>
      <a href='' className={Styles.icon118251}>情報検索</a>
      <a href='' className={Styles.iconMushimegane}>ユーザー検索</a>
      <a href='' className={Styles.iconPerson}>プロフィール</a>
      <a href='' className={Styles.iconGrahp}>データ分析</a>
      <button className={Styles.post_button} onClick={() => setShow(true)}>投稿する</button>
      {/* <button onClick={logout}>ログアウト</button> */}
    </div>
  );
}
