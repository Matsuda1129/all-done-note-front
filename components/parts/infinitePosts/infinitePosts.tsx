import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Heart } from '..';
import Styles from './infinitePosts.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function InfinitePosts({posts}) {
  const user = useSelector((state: RootState) => state.users.user);

  return (
    <div>
      {posts.map((post) => {
        return (
          <div className={Styles.border} key={post.id}>
            <div className={Styles.flex_container}>
              <div className={Styles.namebar}>
                <Image
                  className={Styles.triming}
                  priority
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}` + post.user.picture
                  }
                  height={50}
                  width={50}
                  alt={'アイコン'}
                />
                <div className={Styles.name}>
                  <Link href={`../users/${post.user.name}`}>
                    <a href=''>
                      {post.user.name},{post.id}
                    </a>
                  </Link>
                </div>
              </div>
              <div className={Styles.content}>{post.content}</div>
            </div>
            <div className={Styles.icon_bar}>
              <Heart postId={post.id} userId={user.id} />
              <div className={Styles.iconHukidashi}>50</div>
              <div className={Styles.iconRappa}>50</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
