import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { findUserLikes } from '../../../repositories/likes';
import { Heart } from '../../parts';
import Styles from './infiniteLikes.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function InfiniteLikes({ posts, userId }) {
  const user = useSelector((state: RootState) => state.users.user);
  const [userLikes, setUserLikes] = useState([]);
  useEffect(() => {
    const getUserLikes = async () => {
      try {
        const userLikesData: any = await findUserLikes(userId);
        await setUserLikes(userLikesData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserLikes();
  }, [posts, userId]);

  return (
    <div>
      {userLikes.map((post) => {
        return (
          <div className={Styles.content_border} key={post.post.id}>
            <div className={Styles.flex_container}>
              <div className={Styles.content_flex_namebar}>
                <Image
                  className={Styles.icon}
                  priority
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}` +
                    post.post.user.picture
                  }
                  height={50}
                  width={50}
                  alt={'アイコン'}
                />
                <div className={Styles.content_name}>
                  <Link href={`../users/${post.post.user.name}`}>
                    <a href=''>
                      {post.post.user.name},{post.post.id}
                    </a>
                  </Link>
                </div>
              </div>
              <div className={Styles.content_content}>{post.post.content}</div>
            </div>
            <div className={Styles.content_bar}>
              <Heart postId={post.post.id} userId={user.id} />
              <div className={Styles.iconHukidashi}>50</div>
              <div className={Styles.iconRappa}>50</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
