import Image from 'next/image';
import Styles from './menubar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../redux/usersSlice';
import { setTrue } from '../../../redux/modalSlice';
import Link from 'next/link';

export default function Menubar() {
  const dispatch = useDispatch();
  const user = useSelector((state: { users: UserState }) => state.users.user);

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
      <Link href='../home'>
        <a className={Styles.iconHome}>ホーム</a>
      </Link>
      <a href='' className={Styles.iconMail}>
        メッセージ
      </a>
      <a href='' className={Styles.iconCheck}>
        目標リスト
      </a>
      <a href='' className={Styles.icon118251}>
        情報検索
      </a>
      <a href='' className={Styles.iconMushimegane}>
        ユーザー検索
      </a>
      <Link href={`/users/${user.name}`}>
        <a className={Styles.iconPerson}>プロフィール</a>
      </Link>
      <a href='' className={Styles.iconGrahp}>
        データ分析
      </a>
      <button
        className={Styles.post_button}
        onClick={() => dispatch(setTrue())}
      >
        投稿する
      </button>
    </div>
  );
}
