import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Styles from '../styles/index.module.css';

export default function Index() {
  const imgurl =
    'https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/treeIcon.jpg';

  return (
    <div>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <div className={Styles.bodyBackground}>
        <div className={Styles.grid_container}>
          <div className={Styles.item_A}>
            <span className={Styles.text}>All Done</span>
            <span className={Styles.text}>
              ノート
              <Image
                className={Styles.triming}
                priority
                src={imgurl}
                height={80}
                width={80}
                alt={'アイコン'}
              />
            </span>
          </div>
          <text className={Styles.item_C}>
            あなたが明日生きているかは神様にもわからない。人生が終わる前にやりたいこ、やらなければならないことを一緒に達成しましょう。
          </text>
          <div className={Styles.item_B}>
            <Link href='./login'>
              <a className={`${Styles.btnLogin} ${Styles.loginBtn}`}>
                ログイン
              </a>
            </Link>
          </div>
          <div className={Styles.item_D}>
            <Link href='./register'>
              <a className={`${Styles.btnAccount} ${Styles.makeAccountBtn}`}>
                アカウント作成
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
