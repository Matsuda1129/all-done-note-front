import Image from 'next/image';
import Styles from './menubar.module.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { reset } from '../redux/usersSlice';
import { useSelector } from 'react-redux';
import { UserState } from '../redux/usersSlice';

export default function Menubar() {
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
        <div>{user.name}</div>
      </div>
      <div className={Styles.iconHome}>ホーム</div>
      <div className={Styles.iconMail}>メッセージ</div>
      <div className={Styles.iconCheck}>目標リスト</div>
      <div className={Styles.icon118251}>情報検索</div>
      <div className={Styles.iconMushimegane}>ユーザー検索</div>
      <div className={Styles.iconPerson}>プロフィール</div>
      <div className={Styles.iconGrahp}>データ分析</div>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
}
