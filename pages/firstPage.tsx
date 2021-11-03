import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import firstPageStyles from '../styles/firstPage.module.css';

export default function FirstPage() {
  return (
    <div>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <div className={firstPageStyles.bodyBackground}>
        <div className={firstPageStyles.grid_container}>
          <div className={firstPageStyles.item_A}>
            <span className={firstPageStyles.text}>All Done</span>
            <span className={firstPageStyles.text}>
              ノート
              <Image
                priority
                src='/images/treeIcon.jpg'
                height={80}
                width={80}
                alt={'アイコン'}
              />
            </span>
          </div>
          <text className={firstPageStyles.item_C}>
            あなたが明日生きているかは神様にもわからない。人生が終わる前にやりたいこ、やらなければならないことを一緒に達成しましょう。
          </text>
          <div className={firstPageStyles.item_B}>
            <Link href='./login'>
              <a
                className={`${firstPageStyles.btnLogin} ${firstPageStyles.loginBtn}`}
              >
                ログイン
              </a>
            </Link>
          </div>
          <div className={firstPageStyles.item_D}>
            <Link href='./register'>
              <a
                className={`${firstPageStyles.btnAccount} ${firstPageStyles.makeAccountBtn}`}
              >
                アカウント作成
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
