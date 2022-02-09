import Image from 'next/image';
import Styles from './menubar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../../../redux/usersSlice';
import { setTrue } from '../../../../../redux/modalSlice';
import Link from 'next/link';
import { backfaceFixed } from '../../../../../lib/backFaceFixed';

export default function Menubar() {
  const dispatch = useDispatch();
  const user = useSelector((state: { users: UserState }) => state.users.user);

  return (
    <div>
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
        <Link href='../../home'>
          <a href='' className={Styles.display_flex}>
            <Image
              alt={'アイコン'}
              priority
              src='/menu/home.png'
              height={32}
              width={32}
            />
            <div className={Styles.message}>ホーム</div>
          </a>
        </Link>
        <br />
        <Link href={`../../mail`}>
          <a href='' className={Styles.display_flex}>
            <Image
              alt={'アイコン'}
              priority
              src='/menu/mail.png'
              height={32}
              width={32}
            />
            <div className={Styles.message}>メッセージ</div>
          </a>
        </Link>
        <br />
        <Link href={`../../todos/${user.name}`}>
          <a href='' className={Styles.display_flex}>
            <Image
              alt={'アイコン'}
              priority
              src='/menu/check2.png'
              height={32}
              width={32}
            />
            <div className={Styles.message}>目標リスト</div>
          </a>
        </Link>
        <br />
        <Link href='../../information'>
          <a href='' className={Styles.display_flex}>
            <Image
              alt={'アイコン'}
              priority
              src='/menu/mushimegane3.png'
              height={32}
              width={32}
            />
            <div className={Styles.message}>情報検索</div>
          </a>
        </Link>
        <br />
        <Link href={'../../searchUser'}>
          <a href='' className={Styles.display_flex}>
            <Image
              alt={'アイコン'}
              priority
              src='/menu/userSearch.png'
              height={32}
              width={32}
            />
            <div className={Styles.message}>ユーザー検索</div>
          </a>
        </Link>
        <br />
        <Link href={`/users/${user.name}`}>
          <a href='' className={Styles.display_flex}>
            <Image
              alt={'アイコン'}
              priority
              src='/menu/user.png'
              layout={'fixed'}
              height={32}
              width={32}
            />
            <div className={Styles.message}>プロフィール</div>
          </a>
        </Link>
        <Link href={'/dataAnalist'}>
          <a href='' className={Styles.display_flex}>
            <Image
              alt={'アイコン'}
              layout={'fixed'}
              src='/menu/graf.png'
              height={32}
              width={32}
            />
            <div className={Styles.message}>データ分析</div>
          </a>
        </Link>
        <br />
        <br />
        <button
          className={Styles.post_button}
          onClick={() => {
            dispatch(setTrue()), backfaceFixed(true);
          }}
        >
          投稿する
        </button>
      </div>
    </div>
  );
}
